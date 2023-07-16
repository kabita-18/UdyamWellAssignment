import express from 'express';
import { login, signup, resetPassword, forgotPassword } from '../controllers/users.js'

const router = express.Router();

router.post('/login', login)
router.post('/sign-up', signup)
router.post('/reset-password/:token', resetPassword)
router.post('/forgot-password', forgotPassword)

export default router;
