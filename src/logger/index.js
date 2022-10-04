import morgan from 'morgan';
import { createLogger, format, transports } from 'winston';
import moment from 'moment';
const { combine, colorize, timestamp, label, printf } = format;

const loggerConfiguration = {
  format: combine(
    colorize(),
    timestamp(),
    label({ label: 'express API' }),
    printf((params) => {
      return `${new Date().toTimeString()} - ${params.level}: ${
        params.message
      }`;
    })
  ),
  level: 'silly',
  defaultMeta: { service: 'user-service' },
};

const winstonLogger = createLogger();

winstonLogger.add(new transports.Console(loggerConfiguration));

const morganLogger = morgan('tiny', {
  stream: {
    write: (text) => winstonLogger.http(`\x1b[32m[request]\x1b[0m ${text}`),
  },
});

export { winstonLogger, morganLogger };
