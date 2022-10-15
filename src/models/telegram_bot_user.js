import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramBotUser = sequelize.define('telegram_bot_user', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  },
  is_bot: {
    type: DataTypes.BOOLEAN,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  language_code: {
    type: DataTypes.STRING,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_bot_user table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramBotUser;
