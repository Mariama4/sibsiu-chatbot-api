import sequelize from '../db/index.js';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const TelegramBotConfiguration = sequelize.define(
  'telegram_bot_configuration',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      enique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  }
);

sequelize
  .sync()
  .then(() => {
    Logger.info('telegram_bot_configuration table created successfully!');

    TelegramBotConfiguration.findOrCreate({
      where: {
        id: '0',
      },
      defaults: {
        token: '',
        status: false,
      },
    }).then((result) => {
      if (!result[1]) {
        Logger.warn('Configuration already exist');
      } else {
        Logger.warn('Configuration created');
      }
    });
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default TelegramBotConfiguration;
