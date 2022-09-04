import Sequelize from '../db';
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

module.exports = TelegramBotConfiguration;
