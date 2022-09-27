import { Router } from 'express';
import userRouter from './user.Router.js';
import configurationRouter from './telegram_bot_configuration.Router.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/configuration', configurationRouter);

export default router;
