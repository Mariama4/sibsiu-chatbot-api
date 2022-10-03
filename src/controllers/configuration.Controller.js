import { TelegramBotConfiguration } from '../models/index.js';
import ApiError from '../error/api.Error.js';
import { exec } from 'child_process';
import { winstonLogger as Logger } from '../logger/index.js';

class ConfigurationController {
  async updateToken(req, res, next) {
    const { id, token } = req.body;

    const configuration = await TelegramBotConfiguration.update(
      {
        token,
      },
      { where: { id } }
    );
    if (!Number(configuration)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    } else {
      const updatedConfiguration = await TelegramBotConfiguration.findOne({
        where: { id },
      });
      return res.json({ message: 'Запись обновлена.', updatedConfiguration });
    }
  }

  async updateStatus(req, res, next) {
    const { id, status } = req.body;
    let executionLine;
    executionLine = status
      ? 'bash src/bash/StartBot.sh'
      : 'bash src/bash/StopBot.sh';

    exec(executionLine, (error, stdout, stderr) => {
      if (error) {
        Logger.error(error.message);
        // return next(ApiError.internal('Непредвиденная ошибка.'));
      }
      if (stderr) {
        Logger.warn(`stderr: ${stderr}`);
        // return next(ApiError.internal('Непредвиденная ошибка.'));
      }
      Logger.info(`stdout: ${stdout}`);
    });

    const configuration = await TelegramBotConfiguration.update(
      {
        status,
      },
      { where: { id } }
    );
    if (!Number(configuration)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    } else {
      const updatedConfiguration = await TelegramBotConfiguration.findOne({
        where: { id },
      });
      return res.json({ message: 'Запись обновлена.', updatedConfiguration });
    }
  }

  async updateBotName(req, res, next) {
    const { id, name } = req.body;

    const configuration = await TelegramBotConfiguration.update(
      {
        bot_name: name,
      },
      { where: { id } }
    );
    if (!Number(configuration)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    } else {
      const updatedConfiguration = await TelegramBotConfiguration.findOne({
        where: { id },
      });
      return res.json({ message: 'Запись обновлена.', updatedConfiguration });
    }
  }

  async getData(req, res, next) {
    const configuration = await TelegramBotConfiguration.findAll();
    return res.json({ configuration });
  }
}

export default new ConfigurationController();
