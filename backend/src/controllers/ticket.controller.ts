import { Request, Response } from 'express';
import ticketService from '../services/ticket.service';
import { AuthRequest } from '../middlewares/auth.middleware';

class TicketController {
  /**
   * Get all tickets
   * @param req - Express request object
   * @param res - Express response object
   */
  async getAllTickets(req: Request, res: Response): Promise<void> {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get a ticket by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  async getTicketById(req: Request, res: Response): Promise<void> {
    try {
      const ticket = await ticketService.getTicketById(req.params.id);

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }

      res.status(200).json(ticket);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Create a new ticket
   * @param req - Express request object with authenticated user
   * @param res - Express response object
   */
  async createTicket(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { title, description, status, assignedUser } = req.body;

      if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
      }

      const ticketData = {
        title,
        description,
        status: status || 'open',
        assignedUser: assignedUser || null
      };

      const ticket = await ticketService.createTicket(ticketData);

      res.status(201).json({
        message: 'Ticket created successfully',
        ticket
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Update an existing ticket
   * @param req - Express request object with authenticated user
   * @param res - Express response object
   */
  async updateTicket(req: AuthRequest, res: Response): Promise<void> {
    try {
      const ticket = await ticketService.updateTicket(req.params.id, req.body);

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }

      res.status(200).json({
        message: 'Ticket updated successfully',
        ticket
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Delete a ticket by ID
   * @param req - Express request object
   * @param res - Express response object
   */
  async deleteTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticket = await ticketService.deleteTicket(req.params.id);

      if (!ticket) {
        res.status(404).json({ message: 'Ticket not found' });
        return;
      }

      res.status(200).json({
        message: 'Ticket deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Get tickets by user ID
   * @param req - Express request object with authenticated user
   * @param res - Express response object
   */
  async getTicketsByUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.params.userId || req.user.id;
      const tickets = await ticketService.getTicketsByUser(userId);

      res.status(200).json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new TicketController();