import { Request, Response } from 'express';
import authService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

class AuthController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { fullName, email, password, role } = req.body;

            if (!fullName || !email || !password) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const user = await authService.registerUser({ fullName, email, password, role });

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Missing required fields' });
                return;
            }

            const { user, token } = await authService.loginUser(email, password);

            res.status(200).json({
                message: 'Login successful',
                user,
                token
            });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }

    }

    async logout(req: AuthRequest, res: Response): Promise<void> {
        try {
            const token = req.body.token;

            if (!token) {
                res.status(400).json({ message: 'No active session' });
                return;
            }

            await authService.logoutUser(token);

            res.status(200).json({ message: 'Logout successful' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default new AuthController();