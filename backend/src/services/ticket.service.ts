import ticket, { ITicket } from '../models/ticket.model';
import { Types } from 'mongoose';

class TicketService {
    /**
     * Fetches all tickets from the database.
     * @returns {Promise<ITicket[]>} A promise that resolves to an array of tickets.
     */
    async getAllTickets(): Promise<ITicket[]> {
        try {
            return await ticket.find().populate('assignedUser', '-password');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches a ticket by its ID.
     * @param {string} ticketId - The ID of the ticket to fetch.
     * @returns {Promise<ITicket | null>} A promise that resolves to the ticket or null if not found.
     */
    async getTicketById(ticketId: string): Promise<ITicket | null> {
        try {
            return await ticket.findById(ticketId).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new ticket.
     * @param {Partial<ITicket>} ticketData - The data for the new ticket.
     * @returns {Promise<ITicket | null>} A promise that resolves to the created ticket or null if creation failed.
     */
    async createTicket(ticketData: Partial<ITicket>): Promise<ITicket | null> {
        try {
            const newTicket = new ticket(ticketData);
            return await newTicket.save();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates an existing ticket by its ID.
     * @param {string} ticketId - The ID of the ticket to update.
     * @param {Partial<ITicket>} ticketData - The new data for the ticket.
     * @returns {Promise<ITicket | null>} A promise that resolves to the updated ticket or null if update failed.
     */
    async updateTicket(ticketId: string, ticketData: Partial<ITicket>): Promise<ITicket | null> {
        try {
            return await ticket.findByIdAndUpdate(ticketId, ticketData, { new: true }).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Deletes a ticket by its ID.
     * @param {string} ticketId - The ID of the ticket to delete.
     * @returns {Promise<ITicket | null>} A promise that resolves to the deleted ticket or null if deletion failed.
     */
    async deleteTicket(ticketId: string): Promise<ITicket | null> {
        try {
            return await ticket.findByIdAndDelete(ticketId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Fetches tickets assigned to a specific user.
     * @param {string} userId - The ID of the user whose tickets to fetch.
     * @returns {Promise<ITicket[]>} A promise that resolves to an array of tickets assigned to the user.
     */
    async getTicketsByUser(userId: string): Promise<ITicket[]> {
        try {
            return await ticket.find({ assignedUser: new Types.ObjectId(userId) }).populate('assignedUser', 'fullName email');
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketService();