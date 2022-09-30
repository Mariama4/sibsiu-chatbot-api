import TelegramBotFrame from '../models/telegram_bot_frame.js';
import ApiError from '../error/api.Error.js';

class FrameController {
  async create(req, res, next) {
    const { data } = req.body;
    const frame = await TelegramBotFrame.create({
      data,
    });
    return res.json({ message: 'Добавлено' });
  }

  async update(req, res, next) {
    return;
  }

  async delete(req, res, next) {
    return;
  }

  async getAll(req, res, next) {
    const frames = await TelegramBotFrame.findAll();
    return res.json({ frames });
  }

  async getById(req, res, next) {
    const { id } = req.body;
    const frame = await TelegramBotFrame.findOne({
      where: { id },
    });
    return res.json({ frame });
  }
}

export default new FrameController();
