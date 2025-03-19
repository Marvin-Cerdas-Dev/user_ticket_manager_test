import ticket, { ITicket } from '../models/ticket.model';
import { Types } from 'mongoose';

class TicketService {
    async getrAllTickets(): Promise<ITicket[]> {
        try{
            return await ticket.find().populate('assignedUser', '-password');
        } catch (error) {
            throw error;
        }
    }

    async getTicketById(ticketId: string): Promise<ITicket | null> {
        try {
            return await ticket.findById(ticketId).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }

    async createTicket(ticketData: Partial<ITicket>): Promise<ITicket | null> {
        try {
            const newTicket = new ticket(ticketData);
            return await newTicket.save();
        } catch (error) {
            throw error;
        }
    }

    async updateTicket(ticketId: string, ticketData: Partial<ITicket>): Promise<ITicket | null> {
        try {
            return await ticket.findByIdAndUpdate(ticketId, ticketData, { new: true }).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }

    async deleteTicket(ticketId: string): Promise<ITicket | null> {
        try {
            return await ticket.findByIdAndDelete(ticketId);
        } catch (error) {
            throw error;
        }
    }

    async getTicketsByUser(userId: string): Promise<ITicket[]> {
        try {
            return await ticket.find({ assignedUser: new Types.ObjectId(userId) }).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketService();