import { Router } from 'express';
import frameController from '../controllers/frame.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.post('/', frameController.create);
router.patch('/', frameController.update);
router.get('/', frameController.getAll);

export default router;
