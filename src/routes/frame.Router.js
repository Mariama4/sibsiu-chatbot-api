import { Router } from 'express';
import frameController from '../controllers/frame.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.post('/', authMiddleware, frameController.create);
router.patch('/', authMiddleware, frameController.update);
router.get('/', authMiddleware, frameController.getAll);
router.delete('/:id', authMiddleware, frameController.delete);

export default router;
