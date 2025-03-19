import { Router } from "express";
import authController from '../controllers/auth.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

// Create a new router instance
const router = Router();

// Route to handle user registration
router.post('/register', authController.register);

// Route to handle user login
router.post('/login', authController.login);

// Route to handle user logout
router.post('/logout', authController.logout);

export default router;