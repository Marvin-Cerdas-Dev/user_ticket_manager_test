import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';

// Create a new router instance
const router = Router();

// Route to get all tickets
router.get('/', authenticateToken, ticketController.getAllTickets);

// Route to get a ticket by its ID
router.get('/:id', authenticateToken, ticketController.getTicketById);

// Route to create a new ticket
router.post('/', authenticateToken, ticketController.createTicket);

// Route to update a ticket by its ID
router.put('/:id', authenticateToken, ticketController.updateTicket);

// Route to delete a ticket by its ID (admin only)
router.delete('/:id', authenticateToken, isAdmin, ticketController.deleteTicket);

// Route to get tickets by user ID (optional)
router.get('/user/:userId?', authenticateToken, ticketController.getTicketsByUser);

export default router;