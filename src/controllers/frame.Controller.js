import TelegramBotFrame from '../models/telegram_bot_frame.js';
import ApiError from '../error/api.Error.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FrameController {
  async create(req, res, next) {
    let { data } = req.body;
    data = JSON.parse(data);
    if (req.files !== null) {
      if (data.DATA.MESSAGE.TYPE == 'PHOTO') {
        const { photo } = req.files;
        let fileName = uuidv4() + '.' + photo.name.split('.')[1];
        photo.mv(path.resolve(__dirname, '../..', 'public', fileName));
        data.DATA.MESSAGE.PHOTO = fileName;
      } else if (data.DATA.MESSAGE.TYPE == 'MEDIA_GROUP') {
        let { media } = req.files;
        let mediaArr = [];
        media.map((element, index) => {
          let fileName = uuidv4() + '.' + element.name.split('.')[1];
          element.mv(path.resolve(__dirname, '../..', 'public', fileName));
          mediaArr.push(fileName);
        });
        data.DATA.MESSAGE.MEDIA_GROUP = mediaArr;
      } else if (data.DATA.MESSAGE.TYPE == 'VIDEO_NOTE') {
        console.log(req.files);
        const { video_note } = req.files;
        let fileName = uuidv4() + '.' + video_note.name.split('.')[1];
        video_note.mv(path.resolve(__dirname, '../..', 'public', fileName));
        data.DATA.MESSAGE.VIDEO_NOTE = fileName;
      }
    }
    const frame = await TelegramBotFrame.create({
      data,
    });
    return res.json({ message: 'Добавлено', frame });
  }

  async update(req, res, next) {
    let { id, data } = req.body;
    data = JSON.parse(data);
    if (req.files !== null) {
      if (data.DATA.MESSAGE.TYPE == 'PHOTO') {
        const { photo } = req.files;
        let fileName = uuidv4() + '.' + photo.name.split('.')[1];
        photo.mv(path.resolve(__dirname, '../..', 'public', fileName));
        data.DATA.MESSAGE.PHOTO = fileName;
      } else if (data.DATA.MESSAGE.TYPE == 'MEDIA_GROUP') {
        let { media } = req.files;
        let mediaArr = [];
        media.map((element, index) => {
          let fileName = uuidv4() + '.' + element.name.split('.')[1];
          element.mv(path.resolve(__dirname, '../..', 'public', fileName));
          mediaArr.push(fileName);
        });
        data.DATA.MESSAGE.MEDIA_GROUP = mediaArr;
      } else if (data.DATA.MESSAGE.TYPE == 'VIDEO_NOTE') {
        const { video_note } = req.files;
        let fileName = uuidv4() + '.' + video_note.name.split('.')[1];
        video_note.mv(path.resolve(__dirname, '../..', 'public', fileName));
        data.DATA.MESSAGE.VIDEO_NOTE = fileName;
      }
    }
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
