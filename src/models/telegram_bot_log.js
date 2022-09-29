import Sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const TelegramBotLog = Sequelize.define('telegram_bot_log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  action: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

export default TelegramBotLog;
