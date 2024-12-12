import express from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const userController = new UserController();

// Route to get user profile
router.get('/profile', authMiddleware, userController.getProfile);

// Route to update user profile
router.put('/profile', authMiddleware, userController.updateProfile);

// Route to delete user account
router.delete('/account', authMiddleware, userController.deleteAccount);

export default router;