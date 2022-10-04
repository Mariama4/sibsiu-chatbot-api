import sequelize from './src/db/index.js';
import startPythonFile from './src/services/parse_sibsiu_shedule.js';
import * as models from './src/models/index.js';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import router from './src/routes/index.js';
import errorHandler from './src/middleware/ErrorHandling.Middleware.js';
import { morganLogger, winstonLogger as Logger } from './src/logger/index.js';

const PORT = process.env.PORT || 5050;

const app = express();

app.use(morganLogger);
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/api', router);
app.use('/public', express.static('public'));
app.use(errorHandler);

const start = async () => {
  try {
    // startPythonFile();
    app.listen(PORT, () => {
      Logger.info(`Server running on port ${PORT}`);
    });
  } catch (e) {
    Logger.error(e);
  }
};

start();
