import { Sequelize } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь
  process.env.DB_PASSWORD, // Пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: (message) =>
      Logger.verbose(`\x1b[36m[sequelize]\x1b[0m ${message}`),
  }
);

sequelize
  .authenticate()
  .then(() => {
    Logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    Logger.error('Unable to connect to the database: ', error);
  });

export default sequelize;
