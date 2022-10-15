import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramBotFrameLog = sequelize.define('telegram_bot_frame_log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  frame_id: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.BIGINT,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_bot_frame_log table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramBotFrameLog;
