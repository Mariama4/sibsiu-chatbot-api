import requests as request
from pdf2image import convert_from_path
from bs4 import BeautifulSoup
import datetime
import re
import random
import string
import shutil
import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv
from pathlib import Path
from dateutil.parser import parse
import pandas as pd


dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)


def deleteOldData(response):
    query = ''
    for index, r in response.iterrows():
        pdfURL = r['url_pdf_local']
        imgURL = r['url_png_page']
        if os.path.exists(imgURL):
            os.remove(imgURL)
        query += f"DELETE FROM sibsiu_shedules WHERE id = '{r['id']}';"
    if os.path.exists(pdfURL):
        os.remove(pdfURL)
    CURSOR.execute(query)


def CheckLastModified(link, BUFFERDF):
    skip = False
    res = request.get(link)
    res.encoding = 'utf-8'
    # дата последнего обновления файла
    lastModified = parse(res.headers['Last-Modified'])
    response = BUFFERDF.loc[BUFFERDF['url_pdf_global'] == link]
    if response.empty:
        return res, lastModified, skip
    savedLastModified = parse(str(response.iloc[0]['date_last_modified']))

    if lastModified == savedLastModified:
        skip = True
    else:
        skip = False
        deleteOldData(response)

    return res, lastModified, skip


def ConvertPDFtoPNG(pdf):
    pdfFileName = 'storage/pdf/' + ''.join(random.choice(string.ascii_letters)
                                           for i in range(20)) + '.pdf'
    with open(pdfFileName, 'wb') as f:
        f.write(pdf.content)
    images = convert_from_path(pdfFileName, dpi=300)
    return images, pdfFileName


def SaveImages(images, resultStructure,
               instituteTitle,
               pdfFileName,
               pdfLinkGlobal,
               pdfLinkLocal,
               lastModified
               ):
    countOfPics = len(images)
    listOfUrls = []
    for i, v in enumerate(images):
        pngUrl = 'storage/img/' + \
            ''.join(random.choice(string.ascii_letters)
                    for j in range(20)) + '.png'
        v.save(pngUrl)
        resultStructure.append(
            {
                'institute': instituteTitle,
                'file': pdfFileName,
                'url_pdf_global': pdfLinkGlobal,
                'url_pdf_local': pdfLinkLocal,
                'page_number': (i+1),
                'url_png_page': pngUrl,
                'date_last_modified': lastModified
            }
        )


def getShedule():
    SIBSIU_PAGE_URL = 'https://www.sibsiu.ru'
    SIBSIU_SHEDULE_PAGE_URL = SIBSIU_PAGE_URL + '/raspisanie/'

    response = request.get(SIBSIU_SHEDULE_PAGE_URL)
    responseHTML = BeautifulSoup(response.text, 'html.parser')
    instituteDivs = responseHTML.select('.institut_div')
    resultStructure = []
    query = 'SELECT * FROM sibsiu_shedules;'
    CURSOR.execute(query)
    allRowsFromDatabase = CURSOR.fetchall()
    BUFFERDF = pd.DataFrame(
        [*allRowsFromDatabase],
        columns=[
            'id', 'institute', 'file', 'url_pdf_global',
            'url_pdf_local', 'page_number', 'url_png_page',
            'date_last_modified', 'createdAt', 'updatedAt'
        ]
    )

    for institute in instituteDivs:
        instituteTitle = institute.select('p.p_title > strong')
        instituteTitle = re.findall(r"\>(.*?)\<", str(instituteTitle))
        instituteTitle = [i for i in instituteTitle if i][0].strip()
        instituteFilesLinkList = institute.select(
            'li.ul_file > a')
        for item in instituteFilesLinkList:
            pdfFileName = item.getText()
            pdfLink = SIBSIU_PAGE_URL + \
                item['href'].replace('\\', '/').replace(' ', '%20')

            pdf, lastModified, skip = CheckLastModified(pdfLink, BUFFERDF)
            if skip:
                continue
            images, pdfLinkLocal = ConvertPDFtoPNG(pdf)
            SaveImages(images,
                       resultStructure,
                       instituteTitle,
                       pdfFileName,
                       pdfLink,
                       pdfLinkLocal,
                       lastModified
                       )
            # SaveToDatabase(resultStructure)
            # return
    SaveToDatabase(resultStructure)


def SaveToDatabase(structure):
    query = ''
    if len(structure) == 0:
        return
    for r in structure:
        query += f'''INSERT INTO 
                        public.sibsiu_shedules(institute, 
                                               file, 
                                               url_pdf_global, 
                                               url_pdf_local, 
                                               page_number, 
                                               url_png_page, 
                                               date_last_modified,
                                               "createdAt",
                                               "updatedAt") 
                    VALUES ('{r['institute']}', 
                            '{r['file']}', 
                            '{r['url_pdf_global']}', 
                            '{r['url_pdf_local']}', 
                            '{r['page_number']}', 
                            '{r['url_png_page']}', 
                            '{r['date_last_modified']}',
                            NOW(),
                            NOW());'''

    CURSOR.execute(query)


def updateDir(dir):
    path = 'storage/' + dir
    shutil.rmtree(path)
    os.mkdir(path)


if __name__ == '__main__':
    print('hello its python')
    try:
        # Подключение к существующей базе данных
        CONNECTION = psycopg2.connect(user=os.getenv('DB_USER'),
                                      database=os.getenv('DB_NAME'),
                                      password=os.getenv('DB_PASSWORD'),
                                      host=os.getenv('DB_HOST'),
                                      port=os.getenv('DB_PORT'))
        CONNECTION.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        # Курсор для выполнения операций с базой данных
        CURSOR = CONNECTION.cursor()
    except (Exception, Error) as error:
        print("Ошибка при работе с PostgreSQL", error)
    getShedule()
    if CONNECTION:
        CURSOR.close()
        CONNECTION.close()
        print("Соединение с PostgreSQL закрыто")
