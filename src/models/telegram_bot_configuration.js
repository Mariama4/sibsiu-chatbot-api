import Sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const TelegramBotConfiguration = Sequelize.define(
  'telegram_bot_configuration',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      enique: true,
    },
    data: {
      type: DataTypes.STRING,
    },
  }
);

export default TelegramBotConfiguration;
