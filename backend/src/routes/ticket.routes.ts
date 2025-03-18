import { Router } from 'express';

const router = Router();

// Placeholder para rutas de tickets
router.get('/tickets', (req, res) => {
  res.json({ message: 'Ticket route works' });
});

export default router;