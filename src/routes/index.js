import { Router } from 'express';
import userRouter from './user.Router.js';

const router = new Router();

router.use('/user', userRouter);

export default router;
