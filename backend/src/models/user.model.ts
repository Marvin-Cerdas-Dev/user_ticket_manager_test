import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface representing a user document in MongoDB
export interface IUser extends Document {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface representing a user response object
export interface IUserResponse {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

// Mongoose schema for the user model
const userSchema: Schema<IUser> = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, {
  timestamps: true
});

// Middleware to hash the password before saving the user document
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare a candidate password with the user's hashed password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the user model
export default mongoose.model<IUser>('User', userSchema);