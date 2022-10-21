import { TelegramBotLog } from '../models/index.js';
import { winstonLogger as Logger } from '../logger/index.js';
import { Op } from 'sequelize';

class LogController {
  async create(req, res, next) {
    let { data } = req.body;
    data = JSON.parse(data);
    await TelegramBotLog.create({ data });
    return res.json({});
  }

  async getAll(req, res, next) {
    const logs = await TelegramBotLog.findAll();
    return res.json({ result: logs });
  }

  async getAllLimit(req, res, next) {
    const { limit } = req.body;
    console.log(limit);
    const logs = await TelegramBotLog.findAll({
      limit: limit,
      order: [['id', 'DESC']],
    });
    return res.json({ result: logs });
  }

  async getByDate(req, res, next) {
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const logs = await TelegramBotLog.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return res.json({ result: logs });
  }
}

export default new LogController();
