import Sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const SibsiuShedule = Sequelize.define(
  'sibsiu_shedule',
  {
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
    url_pdf: {
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
  },
  {
    timestamps: true,
  }
);

export default SibsiuShedule;
