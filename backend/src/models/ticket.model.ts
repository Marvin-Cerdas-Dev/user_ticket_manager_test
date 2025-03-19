import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  status: string;
  assignedUser?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

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

export default mongoose.model<ITicket>('Ticket', ticketSchema);