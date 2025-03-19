import { Router } from 'express';
import ticketController from '../controllers/ticket.controller';
import { authenticateToken, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, ticketController.getAllTickets);
router.get('/:id', authenticateToken, ticketController.getTicketById);
router.post('/', authenticateToken, ticketController.createTicket);
router.put('/:id', authenticateToken, ticketController.updateTicket);
router.delete('/:id', authenticateToken, isAdmin, ticketController.deleteTicket);
router.get('/user/:userId?', authenticateToken, ticketController.getTicketsByUser);

export default router;