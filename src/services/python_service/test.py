import psycopg2
from psycopg2 import Error
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
from dotenv import load_dotenv
from pathlib import Path

# ПРИ ДОБАВЛЕНИИ В main.py ЗАМЕНИТЬ НА .env
dotenv_path = Path('../../../.env')
load_dotenv(dotenv_path=dotenv_path)

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
    query = "SELECT * FROM sibsiu_shedules WHERE url_pdf = 'Архитектурно-строительный институт'"
    cursor.execute(query)
    print(cursor.fetchone()[0])
    # print(cursor.index('test url_pdf'))
except (Exception, Error) as error:
    print("Ошибка при работе с PostgreSQL", error)
finally:
    if connection:
        cursor.close()
        connection.close()
        print("Соединение с PostgreSQL закрыто")
