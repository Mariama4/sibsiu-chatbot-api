import sequelize from './src/db/index.js';
import startPythonFile from './src/services/parse_sibsiu_shedule.js';
import models from './src/models/index.js';

const start = async () => {
  await sequelize.authenticate();
  // await SibsiuShedule.sync();
  await sequelize.sync();
  // await sequelize.drop();
  // startPythonFile();
};

start();
