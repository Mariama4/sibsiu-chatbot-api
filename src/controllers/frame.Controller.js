import { TelegramBotFrame } from '../models/index.js';
import ApiError from '../error/api.Error.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frameJsonFile = fs.readFileSync('./src/json/frame.json');
const frameJsonStructure = JSON.parse(frameJsonFile);

const saveSinglFile = (media) => {
  const fileExtansion = media.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtansion}`;
  media.mv(path.resolve(__dirname, '../..', 'public', fileName));
  return fileName;
};

const saveSeveralFiles = (media) => {
  let filesNameArray = [];
  media.map((element) => {
    let fileExtansion = element.name.split('.').pop();
    let fileName = `${uuidv4()}.${fileExtansion}`;
    element.mv(path.resolve(__dirname, '../..', 'public', fileName));
    filesNameArray.push(fileName);
  });
  return filesNameArray;
};

class FrameController {
  async create(req, res, next) {
    const frame = await TelegramBotFrame.create({
      data: frameJsonStructure,
    });
    return res.json({ message: 'Добавлено', data: frame });
  }

  async update(req, res, next) {
    let { id, data } = req.body;

    if (!id || !!parseInt(id)) {
      return next(ApiError.internal('Неверный id'));
    } else if (!data || !data.trim()) {
      return next(ApiError.internal('Неверный data'));
    }
    try {
      data = JSON.parse(data);
    } catch (error) {
      return next(ApiError.internal(`Неверный data ${error}`));
    }

    if (req.files !== null) {
      const { media } = req.files;
      const mediaType = data.DATA.MESSAGE.TYPE;

      switch (mediaType) {
        case 'PHOTO':
          try {
            data.DATA.MESSAGE.PHOTO = saveSinglFile(media);
          } catch (error) {
            return next(ApiError.internal(`Неверный media files или ${error}`));
          }
          break;
        case 'MEDIA_GROUP':
          try {
            data.DATA.MESSAGE.MEDIA_GROUP = saveSeveralFiles(media);
          } catch (error) {
            return next(ApiError.internal(`Неверный media files или ${error}`));
          }
          break;
        case 'VIDEO_NOTE':
          try {
            data.DATA.MESSAGE.VIDEO_NOTE = saveSinglFile(media);
          } catch (error) {
            return next(ApiError.internal(`Неверный media files или ${error}`));
          }
          break;
        default:
          return next(ApiError.internal(`Неверный тип сообщения`));
      }
    }
    const frame = await TelegramBotFrame.update(
      {
        data,
      },
      { where: { id } }
    );
    if (!Number(frame)) {
      return next(ApiError.internal('Запись с таким id не найдена'));
    } else {
      const updatedFrames = await TelegramBotFrame.findAll();
      return res.json({ message: 'Запись обновлена', data: updatedFrames });
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    const frame = await TelegramBotFrame.destroy({ where: { id } });
    if (!Number(frame)) {
      return next(ApiError.internal('Запись с таким id не найдена'));
    } else {
      return res.json({ message: 'Запись удалена' });
    }
  }

  async getAll(req, res, next) {
    const frames = await TelegramBotFrame.findAll({ order: [['id', 'ASC']] });
    return res.json({ data: frames });
  }

  async getById(req, res, next) {
    const { id } = req.body;
    const frame = await TelegramBotFrame.findOne({
      where: { id },
    });
    return res.json({ data: frame });
  }
}

export default new FrameController();
