import mongoose, { Schema, Document } from 'mongoose';

// Interface representing a ticket document in MongoDB
export interface ITicket extends Document {
  title: string;
  description: string;
  status: string;
  assignedUser?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for the ticket model
const ticketSchema: Schema<ITicket> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in progress", "resolved"],
    default: "open"
  },
  assignedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, {
  timestamps: true
});

// Mongoose model for the ticket schema
export default mongoose.model<ITicket>('Ticket', ticketSchema);