import { Router } from "express";

const router = Router();

router.get('/users', (req, res) => {
  res.json({ message: 'User route works' });
});

export default router;