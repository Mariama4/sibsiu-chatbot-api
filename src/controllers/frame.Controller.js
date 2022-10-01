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
    const { id, data } = req.body;
    const frame = await TelegramBotFrame.update(
      {
        data,
      },
      { where: { id } }
    );
    if (!Number(frame)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    } else {
      const updatedFrames = await TelegramBotFrame.findAll();
      return res.json({ message: 'Запись обновлена.', updatedFrames });
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const frame = await TelegramBotFrame.destroy({ where: { id } });
    if (!Number(frame)) {
      return next(ApiError.internal('Запись с таким id не найдена.'));
    } else {
      return res.json({ message: 'Запись удалена.' });
    }
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
