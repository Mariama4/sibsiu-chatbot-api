import { TelegramBotUser } from '../models/index.js';
import { winstonLogger as Logger } from '../logger/index.js';

class TelegramBotUserController {
  async create(req, res, next) {
    const { id, is_bot, first_name, last_name, username, language_code } =
      req.body;
    await TelegramBotUser.findOrCreate({
      where: {
        id,
      },
      defaults: {
        id,
        is_bot,
        first_name,
        last_name,
        username,
        language_code,
      },
    })
      .then((result) => {
        Logger.info(result);
      })
      .catch((error) => {
        Logger.error(error);
      });
    return res.json({ message: 'oк' });
  }

  async getById(req, res, next) {
    return res.json({ result: 'waw' });
  }

  async getAll(req, res, next) {
    const telegramBotUsers = await TelegramBotUser.findAll();
    return res.json({ result: telegramBotUsers });
  }
}

export default new TelegramBotUserController();
