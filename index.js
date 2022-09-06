import sequelize from './src/db/index.js';
import startPythonFile from './src/services/parse_sibsiu_shedule.js';

const start = async () => {
  // await sequelize.authenticate();
  // await sequelize.sync();
  startPythonFile();
};

start();
