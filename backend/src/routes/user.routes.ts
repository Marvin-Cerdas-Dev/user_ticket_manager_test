import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';

// Create a new router instance
const router = Router();

// Route to get all users, accessible only by admin users
router.get('/', authenticateToken, isAdmin, userController.getAllUsers);

// Route to get a user by ID, accessible by authenticated users
router.get('/:id', authenticateToken, userController.getUserById);

// Route to update a user by ID, accessible by authenticated users
router.put('/:id', authenticateToken, userController.updateUser);

// Route to delete a user by ID, accessible only by admin users
router.delete('/:id', authenticateToken, isAdmin, userController.deleteUser);

export default router;