import { Router } from 'express';
import { homepage } from '../controllers/home.controller.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', requireAuth, homepage);

export default router;
