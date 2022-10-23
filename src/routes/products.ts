import { Router } from 'express';
import { auth } from '../middleware/authentication';
import { productController } from '../controller';

const router = Router();

router.get('/showProducts', auth, productController.showProducts)

export default router