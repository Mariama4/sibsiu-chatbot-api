#!/env
import requests as request
from pdf2image import convert_from_path
from bs4 import BeautifulSoup
import datetime
import re
import random
import string
import shutil
import os


def CheckLastModified(link):
    now = datetime.datetime.now()
    res = request.get(link)
    res.encoding = 'utf-8'
    # дата последнего обновления файла
    lastModified = res.headers['Last-Modified']

    return res, lastModified, now


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
               lastModified,
               dateNow
               ):
    countOfPics = len(images)
    listOfUrls = []
    dateNow = str(dateNow)
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
                'date_last_modified': lastModified,
                'date_last_update': dateNow
            }
        )


def getShedule():
    SIBSIU_PAGE_URL = 'https://www.sibsiu.ru'
    SIBSIU_SHEDULE_PAGE_URL = SIBSIU_PAGE_URL + '/raspisanie/'

    response = request.get(SIBSIU_SHEDULE_PAGE_URL)
    responseHTML = BeautifulSoup(response.text, 'html.parser')
    instituteDivs = responseHTML.select('.institut_div')
    resultStructure = []
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
            pdf, lastModified, dateNow = CheckLastModified(pdfLink)
            images, pdfLinkLocal = ConvertPDFtoPNG(pdf)
            SaveImages(images,
                       resultStructure,
                       instituteTitle,
                       pdfFileName,
                       pdfLink,
                       pdfLinkLocal,
                       lastModified,
                       dateNow
                       )

    print(resultStructure)


def updatePath(dir):
    path = 'storage/' + dir
    shutil.rmtree(path)
    os.mkdir(path)


if __name__ == '__main__':
    print('hello its python')
    updatePath('pdf')
    updatePath('img')
    getShedule()

    # with open('src/services/python_service/link_to_download.txt') as f:
    #     for link in f:
    #         print(CheckLastModified(link.strip()))
    #         break
