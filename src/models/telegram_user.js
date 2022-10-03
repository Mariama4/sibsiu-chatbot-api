import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramUser = sequelize.define('telegram_user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  createdAt: {
    type: DataTypes.DATE,
  },
});

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_user table created successfully!');
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramUser;
