import { TelegramBotConfiguration } from '../models/index.js';
import ApiError from '../error/api.Error.js';
import { exec } from 'child_process';
import { winstonLogger as Logger } from '../logger/index.js';

class ConfigurationController {
  async updateData(req, res, next) {
    const { id, token, bot_name } = req.body;

    if (!id || !!parseInt(id)) {
      return next(ApiError.internal('Invalid id'));
    } else if (!token || !token.trim()) {
      return next(ApiError.internal('Invalid token'));
    } else if (!bot_name || !bot_name.trim()) {
      return next(ApiError.internal('Invalid bot_name'));
    }

    const configuration = await TelegramBotConfiguration.update(
      {
        token,
        bot_name,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!Number(configuration)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    }

    return res.json({
      message: 'Запись обновлена',
    });
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

  async getData(req, res, next) {
    const configuration = await TelegramBotConfiguration.findAll();
    return res.json({ configuration });
  }
}

export default new ConfigurationController();
