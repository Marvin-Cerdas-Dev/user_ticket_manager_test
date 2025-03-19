import jwt from "jsonwebtoken";
import User, { IUser, IUserResponse } from "../models/user.model";
import { JWT_SECRET } from "../config/config";


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

      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

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

  async refreshToken(userId: string): Promise<string> {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    } catch (error) {
      throw error;
    }
  }
}
export default new AuthService();
