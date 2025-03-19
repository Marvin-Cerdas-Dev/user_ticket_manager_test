import { Router } from 'express';
import userController from '../controllers/user.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, isAdmin, userController.getAllUsers);
router.get('/:id', authenticateToken, userController.getUserById);
router.put('/:id', authenticateToken, userController.updateUser);
router.delete('/:id', authenticateToken, isAdmin, userController.deleteUser);

export default router;