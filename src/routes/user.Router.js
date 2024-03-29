import { Router } from 'express';
import userController from '../controllers/user.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

export default router;
