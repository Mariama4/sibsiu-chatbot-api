import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramUserLog = sequelize.define('telegram_user_log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.DATE,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_user_log table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramUserLog;
