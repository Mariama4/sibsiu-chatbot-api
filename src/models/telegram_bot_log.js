import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramBotLog = sequelize.define('telegram_bot_log', {
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

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_bot_log table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramBotLog;
