import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/config';

export class AuthService{
    async registerUser(userData: { fullName: string; email: string, password: string, role?: string }): Promise<IUser> {
        try{
            const existingUser = await User.findOne({ email: userData.email });

            if(existingUser){
                throw new Error('User with this email already exists');
            }

            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email: string, password: string): Promise<{ user: IUser, token: string }> {
        try {
            const user = await User.findOne({ email });
        
            if(!user){
                throw new Error('User not found');
            }

            const isMatch = await user.comparePassword(password);

            if(!isMatch){
                throw new Error('Invalid credentials');
            }

            const payload = {
                id: user._id,
                email: user.email,
                role: user.role
            }

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      
      return {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();