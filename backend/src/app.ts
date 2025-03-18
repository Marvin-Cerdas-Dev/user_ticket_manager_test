import express, {Application, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MONGODB_URI } from './config/config';

//Importing routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import ticketRoutes from './routes/ticket.routes';

//Configurations
const app: Application = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/api/auth', authRoutes);  
app.use('/api/user', userRoutes);
app.use('/api/ticket', ticketRoutes);

//Database connection
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed', error);
    process.exit(1);
});

export default app;

