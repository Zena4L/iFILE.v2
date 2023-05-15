import express from 'express';
import userRouter from './routes/userRoutes'
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use('/users',userRouter)
export default app;