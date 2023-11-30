
import express from 'express';
import { signin, signup, logout } from '../controllers/authController';
import { authenticateUser } from '../middlewares/authetication';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/logout', authenticateUser, logout);

export default router;