import sequelize from '../db/index.js';
import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import { winstonLogger as Logger } from '../logger/index.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    defaultValue: 'USER',
  },
});

sequelize
  .sync()
  .then(async () => {
    Logger.info('user table created successfully!');
    const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    User.findOrCreate({
      where: {
        email: process.env.ADMIN_LOGIN,
      },
      defaults: {
        email: process.env.ADMIN_LOGIN,
        password: hashPassword,
        role: 'ADMIN',
      },
    }).then((result) => {
      if (!result[1]) {
        Logger.warn('admin user already exist');
      } else {
        Logger.info('admin user created');
      }
    });
  })
  .catch((error) => {
    Logger.error(`Unable to create table : ${error}`);
  });

export default User;
