import parseSibsiuShedule from './src/sheduled_jobs/job_parse_sibsiu_shedule.js';
import sequelize from './src/db/index.js';

const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  parseSibsiuShedule();
};

start();
