import { Router } from 'express';

const router = Router();

router.get('/tickets', (req, res) => {
  res.json({ message: 'Ticket route works' });
});

export default router;