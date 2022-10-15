import { Router } from 'express';
import telegramBotUserController from '../controllers/telegramBotUser.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.post('/', authMiddleware, telegramBotUserController.create);
router.get('/', authMiddleware, telegramBotUserController.getAll);
router.get('/:id', authMiddleware, telegramBotUserController.getById);

export default router;
