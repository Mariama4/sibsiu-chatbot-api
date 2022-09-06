import parseSibsiuShedule from './src/services/parse_sibsiu_shedule.js';
import sequelize from './src/db/index.js';

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  parseSibsiuShedule();
};

start();
