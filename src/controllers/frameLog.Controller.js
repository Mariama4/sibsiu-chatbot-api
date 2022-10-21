import { TelegramBotFrameLog } from '../models/index.js';
import { winstonLogger as Logger } from '../logger/index.js';
import { Op } from 'sequelize';

class FrameLogController {
  async create(req, res, next) {
    let { frame_id, user_id } = req.body;
    await TelegramBotFrameLog.create({
      frame_id,
      user_id,
    });
    return res.json({});
  }

  async getAll(req, res, next) {
    const frame_log = await TelegramBotFrameLog.findAll();
    return res.json({ result: frame_log });
  }

  async getAllLimit(req, res, next) {
    const { limit } = req.body;
    const frame_log = await TelegramBotFrameLog.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    });
    return res.json({ result: frame_log });
  }

  async getByDate(req, res, next) {
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const frame_log = await TelegramBotFrameLog.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return res.json({ result: frame_log });
  }
}

export default new FrameLogController();
