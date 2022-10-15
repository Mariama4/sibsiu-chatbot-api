import { Router } from 'express';
import authMiddleware from '../middleware/auth.Middleware.js';
import LogController from '../controllers/log.Controller.js';

const router = new Router();

router.get('/', authMiddleware, LogController.getAll);
router.post('/', authMiddleware, LogController.create);

export default router;
