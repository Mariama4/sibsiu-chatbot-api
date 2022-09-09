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

dotenv_path = Path('.env')
load_dotenv(dotenv_path=dotenv_path)


def CheckLastModified(link):
    res = request.get(link)
    res.encoding = 'utf-8'
    # дата последнего обновления файла
    lastModified = res.headers['Last-Modified']

    return res, lastModified


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
    #   TODO:
    # SELECT DISTICT PDF FILES AND RETURN LAST MODIFIED INFO FOR COMPARING
    #
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
            pdf, lastModified = CheckLastModified(pdfLink)
            images, pdfLinkLocal = ConvertPDFtoPNG(pdf)
            SaveImages(images,
                       resultStructure,
                       instituteTitle,
                       pdfFileName,
                       pdfLink,
                       pdfLinkLocal,
                       lastModified
                       )

    print(resultStructure)


def SaveToDatabase(structure):
    pass


def updateDir(dir):
    path = 'storage/' + dir
    shutil.rmtree(path)
    os.mkdir(path)


if __name__ == '__main__':
    print('hello its python')
    try:
        # Подключение к существующей базе данных
        connection = psycopg2.connect(user=os.getenv('DB_USER'),
                                      database=os.getenv('DB_NAME'),
                                      password=os.getenv('DB_PASSWORD'),
                                      host=os.getenv('DB_HOST'),
                                      port=os.getenv('DB_PORT'))
        connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        # Курсор для выполнения операций с базой данных
        cursor = connection.cursor()
    except (Exception, Error) as error:
        print("Ошибка при работе с PostgreSQL", error)
    finally:
        if connection:
            cursor.close()
            connection.close()
            print("Соединение с PostgreSQL закрыто")
    updateDir('pdf')
    updateDir('img')
    getShedule()
