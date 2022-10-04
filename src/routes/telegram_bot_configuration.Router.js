import { Router } from 'express';
import ConfigurationController from '../controllers/configuration.Controller.js';

const router = new Router();

router.patch('/data', ConfigurationController.updateData);
router.patch('/status', ConfigurationController.updateStatus);
router.get('/', ConfigurationController.getData);

export default router;
