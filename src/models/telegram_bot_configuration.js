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
    token: {
      type: DataTypes.STRING,
      enique: true,
    },
    bot_name: {
      type: DataTypes.STRING,
      enique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  }
);

export default TelegramBotConfiguration;
