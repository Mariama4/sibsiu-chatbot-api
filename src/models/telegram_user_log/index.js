import Sequelize from '../../db';
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

module.exports = TelegramUserLog;
