import Sequelize from 'db';
import { DataTypes } from 'sequelize';

const User = Sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
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

module.exports = User;
