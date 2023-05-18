import AppError from "../utils/AppError";
import { Request,Response ,NextFunction,ErrorRequestHandler} from "express";
import {CastError} from 'mongoose';
import {MongoError} from 'mongodb'

interface ValidationError extends Error {
    errors: {
      [field: string]: {
        message: string;
        name?: string;
        kind?: string;
        path?: string;
        value?: any;
      };
    };
  }
  


const handleCastErrorDB = (err: CastError): AppError => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoError) => {
    const value = err.message?.match(/(["'])(\\?.)*?\1/)![0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  };

const handleValidationErrorDB = (err:ValidationError) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);
  
const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
  };
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: AppError, req: Request, res: Response) => {
    // A) API
    if (req.originalUrl.startsWith('/v1')) {
      return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
      });
    }
  
    // B) RENDERED WEBSITE
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('404error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  };

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
    // A) API
    if (req.originalUrl.startsWith('/v1')) {
      // A) Operational, trusted error: send message to client
      if (err.isOperational) {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
      }
      // B) Programming or other unknown error: don't leak error details
      // 1) Log error
      console.error('ERROR 💥', err);
      // 2) Send generic message
      return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
      });
    }
  
    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      console.log(err);
      return res.status(err.statusCode).render('404error', {
        title: 'Something went wrong!',
        msg: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(err.statusCode).render('404error', {
      title: 'Something went wrong!',
      msg: 'Please try again later.',
    });
  };

  export default function errorHandler (err: any, req: Request,res: Response,next: NextFunction) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };
      error.message = err.message;
    //   if (error.name === 'CastError') error = handleCastErrorDB(error);
      
      if (error.name === 'CastError') error = handleCastErrorDB(error as CastError);
      if (error.code === 11000) error = handleDuplicateFieldsDB(error);
      if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
      if (error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
  
      sendErrorProd(error, req, res);
    }
  };

