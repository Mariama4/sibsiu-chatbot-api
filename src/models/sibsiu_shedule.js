import Sequelize from '../db';
import { DataTypes } from 'sequelize';

const SibsiuShedule = Sequelize.define('sibsiu_shedule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  institute: {
    type: DataTypes.STRING,
  },
  file: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING,
  },
});

export default SibsiuShedule;
