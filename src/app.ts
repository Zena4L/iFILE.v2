import express,{json} from 'express';
import userRouter from './routes/userRoutes'
import morgan from 'morgan';
import cookieparser from 'cookie-parser';


const app = express();
app.use(morgan('dev'));
app.use(json())
app.use(cookieparser())

app.use('/users',userRouter)
export default app;