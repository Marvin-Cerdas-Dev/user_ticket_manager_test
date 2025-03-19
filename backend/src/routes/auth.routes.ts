import { Router } from "express";

const router = Router();

//Auth routes
router.post('/token', (req, res) => {
    res.send('Authntication route');
});

router.post('/login', (req, res) => {
    res.send('Login route');
});

router.post('/logout', (req, res) => {
    res.send('Register route');
});

router.post('/register', (req, res) => {
    res.send('Register route');
});

export default router;