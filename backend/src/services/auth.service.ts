import jwt from "jsonwebtoken";
import User, { IUser, IUserResponse } from "../models/user.model";
import { JWT_SECRET } from "../config/config";
import BlacklistedToken from '../models/token-blacklist.model';

export class AuthService {
  async registerUser(userData: {
    fullName: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<IUser> {
    try {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: IUserResponse; token: string }> {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      return {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async logoutUser(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      if (!decoded || !decoded.exp) {
        throw new Error('Invalid token');
      }

      const expiresAt = new Date(decoded.exp * 1000);

      await BlacklistedToken.create({
        token,
        expires: new Date(decoded.exp * 1000),
      });
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
