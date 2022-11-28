import { Router } from 'express';
import { auth } from '../middleware/authentication';
import { subscriptionController } from '../controller';

const router = Router();

router.post('/createSubscription', auth, subscriptionController.createSubscription)

export default router