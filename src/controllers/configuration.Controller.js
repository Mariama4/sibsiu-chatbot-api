import { TelegramBotConfiguration } from '../models/index.js';
import ApiError from '../error/api.Error.js';
import { winstonLogger as Logger } from '../logger/index.js';
import axios from 'axios';

class ConfigurationController {
  async updateData(req, res, next) {
    const { id, token, bot_name = 'none' } = req.body;

    if (!!parseInt(id)) {
      return next(ApiError.internal('Неверный id'));
    } else if (!token || !token.trim()) {
      return next(ApiError.internal('Неверный token'));
    } else if (!bot_name || !bot_name.trim()) {
      return next(ApiError.internal('Неверный bot_name'));
    }

    let configuration = await TelegramBotConfiguration.update(
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
    configuration = await TelegramBotConfiguration.findOne({
      where: { id },
    });
    return res.json({
      message: 'Запись обновлена',
      result: configuration,
    });
  }

  async updateStatus(req, res, next) {
    const { id, status } = req.body;

    if (!!parseInt(id)) {
      return next(ApiError.internal('Неверный id'));
    } else if (typeof status != 'boolean') {
      return next(ApiError.internal('Неверный status'));
    }
    const executionRequest = status ? '/start' : '/stop';

    try {
      axios
        .get(process.env.BOT_API + executionRequest)
        .then()
        .catch((error) => Logger.error(error));
    } catch (error) {
      Logger.error(error);
    }

    let configuration = await TelegramBotConfiguration.update(
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
    return res.json({ message: 'Запись обновлена.', result: configuration });
  }

  async getData(req, res, next) {
    const configuration = await TelegramBotConfiguration.findAll();
    return res.json({ result: configuration });
  }
}

export default new ConfigurationController();
