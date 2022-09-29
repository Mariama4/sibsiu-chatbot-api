import Sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const TelegramBotFrame = Sequelize.define('telegram_bot_frame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.JSON,
    enique: true,
  },
});

export default TelegramBotFrame;
