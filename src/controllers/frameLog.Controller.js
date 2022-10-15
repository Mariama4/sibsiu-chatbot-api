import { TelegramBotFrameLog } from '../models/index.js';
import { winstonLogger as Logger } from '../logger/index.js';

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
}

export default new FrameLogController();
