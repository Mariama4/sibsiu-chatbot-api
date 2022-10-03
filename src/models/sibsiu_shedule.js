import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const SibsiuShedule = sequelize.define('sibsiu_shedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  institute: {
    // название института
    type: DataTypes.STRING,
  },
  file: {
    // название файла
    type: DataTypes.STRING,
  },
  url_pdf_global: {
    // ссылка на pdf на сайте сибгиу
    type: DataTypes.STRING,
  },
  url_pdf_local: {
    // ссылка на pdf на сайте сибгиу
    type: DataTypes.STRING,
  },
  page_number: {
    // номер страницы
    type: DataTypes.INTEGER,
  },
  url_png_page: {
    // локальная ссылка на png страницы
    type: DataTypes.STRING,
  },
  date_last_modified: {
    // дата обновления файла на сайте сибгиу
    type: DataTypes.DATE,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('sibsiu_shedule table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default SibsiuShedule;
