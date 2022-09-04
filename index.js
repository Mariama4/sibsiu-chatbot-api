import parseSibsiuShedule from './src/sheduled_jobs/job_parse_sibsiu_shedule/index.js';
import sequelize from './src/db/index.js';

// parseSibsiuShedule();
const start = async () => {
  await sequelize.authenticate();
  await sequelize.sync();
};

start();
