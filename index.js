import parseSibsiuShedule from './src/services/parseSibsiuShedule.js';
import sequelize from './src/db/index.js';

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  parseSibsiuShedule();
};

start();
