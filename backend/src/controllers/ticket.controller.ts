import { Request, Response } from 'express';
import ticketService from '../services/ticket.service';
import { AuthRequest } from '../middlewares/auth.middleware';

class TicketController {
  async getAllTickets(req: Request, res: Response): Promise<void> {
    try {
      const tickets = await ticketService.getAllTickets();
      res.status(200).json(tickets);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

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