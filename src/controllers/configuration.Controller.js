import TelegramBotConfiguration from '../models/telegram_bot_configuration.js';
import ApiError from '../error/api.Error.js';

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
