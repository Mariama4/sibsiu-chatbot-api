import { Router } from 'express';
import FrameLogController from '../controllers/frameLog.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.get('/', authMiddleware, FrameLogController.getAll);
router.post('/limit', authMiddleware, FrameLogController.getAllLimit);
router.post('/between-date', authMiddleware, FrameLogController.getByDate);
router.post('/', authMiddleware, FrameLogController.create);

export default router;
