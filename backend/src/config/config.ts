import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-ticket-manager-test-system';
export const JWT_SECRET = process.env.JWT_SECRET || '5f2b5f2b-f27e-4018-9f79-13caded6c9af';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'; 
