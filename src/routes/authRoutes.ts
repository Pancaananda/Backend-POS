import express from 'express';
import { AuthController } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authController = new AuthController();

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// Middleware to protect routes
router.use(authMiddleware);

// Example of a protected route
router.get('/profile', authController.getProfile);

export default router;