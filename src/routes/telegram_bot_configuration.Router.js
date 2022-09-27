import { Router } from 'express';
import ConfigurationController from '../controllers/configuration.Controller.js';

const router = new Router();

router.patch('/token', ConfigurationController.updateToken);
router.get('/', ConfigurationController.getData);

export default router;
