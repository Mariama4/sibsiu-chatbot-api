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

    if (!id || !!parseInt(id)) {
      return next(ApiError.internal('Invalid id'));
    } else if (!status || !status.trim()) {
      return next(ApiError.internal('Invalid status'));
    }

    const executionCommand = status
      ? 'bash src/bash/StartBot.sh'
      : 'bash src/bash/StopBot.sh';

    exec(executionCommand, (error, stdout, stderr) => {
      if (error) {
        Logger.error(error.message);
      }
      if (stderr) {
        Logger.warn(`stderr: ${stderr}`);
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
    }
    configuration = await TelegramBotConfiguration.findOne({
      where: { id },
    });
    return res.json({ message: 'Запись обновлена.', data: configuration });
  }

  async getData(req, res, next) {
    const configuration = await TelegramBotConfiguration.findAll();
    return res.json({ data: configuration });
  }
}

export default new ConfigurationController();
