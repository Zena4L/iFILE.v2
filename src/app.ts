import path from 'path';
import express,{json,urlencoded, Request,Response,NextFunction} from 'express';
import userRouter from './routes/userRoutes'
import fileRouter from './routes/fileRouter';
import viewRouter from './routes/viewRouter';
import morgan from 'morgan';
import cookieparser from 'cookie-parser';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors';
import AppError from './utils/AppError';
import errorHandler from './controllers/errorController'


const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimiter({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  });
app.use('/v1/api', limiter);


app.use(json({ limit: '10kb' }));
app.use(cookieparser());
app.use(urlencoded({ extended: true, limit: '10kb' }));
app.use(json())

app.use(mongoSanitize());

app.use('/v1/api/users',userRouter)
app.use('/v1/api/files',fileRouter)
app.use('/',viewRouter)

app.all('*', (req:Request, res:Response, next:NextFunction) => {
    next(new AppError(`cannot find ${req.originalUrl}`, 404));
  });

app.use(errorHandler);  

export default app;