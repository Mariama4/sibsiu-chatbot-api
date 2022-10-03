import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramBotFrame = sequelize.define('telegram_bot_frame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.JSONB,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_bot_frame table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramBotFrame;
