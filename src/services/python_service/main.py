#!/env
import requests as request
from pdf2image import convert_from_bytes
from io import BytesIO


def CheckLastModified(link):
    res = request.get(link)
    res.encoding = 'utf-8'
    # дата последнего обновления файла
    lastModified = res.headers['Last-Modified']

    return lastModified, res


def ConvertPDFtoPNG(res):
    images = convert_from_bytes(res.content, dpi=300)
    countOfPics = len(images)
    listOfBytesImages = []

    for i, v in enumerate(images):
        buf = BytesIO()
        v.save(buf, format('PNG'))
        buf.seek(0)
        listOfBytesImages.append(buf)

    return listOfBytesImages, countOfPics


if __name__ == '__main__':
    print('hello its python')
