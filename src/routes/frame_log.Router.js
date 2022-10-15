import { Router } from 'express';
import FrameLogController from '../controllers/frameLog.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.get('/', authMiddleware, FrameLogController.getAll);
router.post('/', authMiddleware, FrameLogController.create);

export default router;
