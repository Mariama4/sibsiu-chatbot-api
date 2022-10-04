import { Router } from 'express';
import ConfigurationController from '../controllers/configuration.Controller.js';
import authMiddleware from '../middleware/auth.Middleware.js';

const router = new Router();

router.patch('/data', authMiddleware, ConfigurationController.updateData);
router.patch('/status', authMiddleware, ConfigurationController.updateStatus);
router.get('/', authMiddleware, ConfigurationController.getData);

export default router;
