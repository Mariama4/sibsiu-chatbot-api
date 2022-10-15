import { TelegramBotLog } from '../models/index.js';
import { winstonLogger as Logger } from '../logger/index.js';

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
}

export default new LogController();
