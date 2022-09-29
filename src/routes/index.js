import { Router } from 'express';
import userRouter from './user.Router.js';
import configurationRouter from './telegram_bot_configuration.Router.js';
import frameRouter from './frame.Router.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/configuration', configurationRouter);
router.use('/frame', frameRouter);

export default router;
