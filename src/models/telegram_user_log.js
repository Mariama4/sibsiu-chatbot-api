import Sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';

const TelegramUserLog = Sequelize.define('telegram_user_log', {
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

export default TelegramUserLog;
