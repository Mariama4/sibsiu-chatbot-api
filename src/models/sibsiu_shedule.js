import Sequelize from '../db';
import { DataTypes } from 'sequelize';

const SibsiuShedule = Sequelize.define('sibsiu_shedule', {
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
  url: {
    // локальная ссылка
    type: DataTypes.STRING,
  },
  date: {
    // дата обновления файла на сайте сибгиу
    type: DataTypes.DATE,
  },
});

export default SibsiuShedule;
