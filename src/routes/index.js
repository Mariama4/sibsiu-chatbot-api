import { Router } from 'express';
import userRouter from './user.Router.js';
import configurationRouter from './telegram_bot_configuration.Router.js';
import frameRouter from './frame.Router.js';
import frameLogRouter from './frame_log.Router.js';
import telegramBotLogRouter from './telegram_bot_log.Router.js';
import telegramBotUserRouter from './telegram_bot_user.Router.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/configuration', configurationRouter);
router.use('/frame', frameRouter);
router.use('/frame_log', frameLogRouter);
router.use('/log', telegramBotLogRouter);
router.use('/tgbot_user', telegramBotUserRouter);

export default router;
