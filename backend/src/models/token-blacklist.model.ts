import mongoose, { Schema, Document } from "mongoose";

// Interface representing a document in MongoDB.
export interface ITokenBlacklist extends Document {
    token: string; // The token to be blacklisted.
    expires: Date; // The expiration date of the token.
}

// Schema for the TokenBlacklist collection.
const TokenBlacklistSchema: Schema = new Schema({
    token: { type: String, required: true }, // The token to be blacklisted.
    expires: { type: Date, required: true }, // The expiration date of the token.
    createdAt: { type: Date, default: Date.now, expires: '1d' } // The creation date of the document, automatically set to expire after 1 days.
});

// Create an index on the token field to ensure uniqueness and improve query performance.
TokenBlacklistSchema.index({ token: 1 });

// Export the model and return the ITokenBlacklist interface.
export default mongoose.model<ITokenBlacklist>('TokenBlacklist', TokenBlacklistSchema);