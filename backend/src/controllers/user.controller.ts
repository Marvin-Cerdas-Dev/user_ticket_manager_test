import { Request, Response } from 'express';
import userService from '../services/user.service';
import { AuthRequest } from '../middlewares/auth.middleware';

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (req.user.role !== 'admin' && req.user.id !== userId) {
        res.status(403).json({ message: 'Unauthorized to update this user' });
        return;
      }
      
      const user = await userService.updateUser(userId, req.body);
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json({
        message: 'User updated successfully',
        user
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (req.user.role !== 'admin' && req.user.id !== userId) {
        res.status(403).json({ message: 'Unauthorized to update this user' });
        return;
      }
        
      const user = await userService.deleteUser(req.params.id);
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json({
        message: 'User deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();