import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import BlacklistedToken from '../models/token-blacklist.model';

// Interface to extend the Request object with user and token properties
export interface AuthRequest extends Request {
  user?: any;
  token?: string;
}

// Middleware to authenticate the JWT token
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token not provided' });
    return;
  }

  try {
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
      res.status(401).json({ message: 'Token has been revoked' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired' });
      return;
    }
    res.status(403).json({ message: 'Invalid token' });
    return;
  }
};

// Middleware to check if the user has admin privileges
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
};