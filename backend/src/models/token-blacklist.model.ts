import mongoose, { Schema, Document } from "mongoose";

export interface ITokenBlacklist extends Document {
    token: string;
    expires: Date;
}

const TokenBlacklistSchema: Schema = new Schema({
    token: { type: String, required: true },
    expires: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: '7d' }
});

TokenBlacklistSchema.index({ token: 1 });

export default mongoose.model<ITokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);