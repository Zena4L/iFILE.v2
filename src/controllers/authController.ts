import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as crypto from 'crypto'
import { RequestHandler , Request} from 'express';
import {User, IUser} from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/CatchAsync";
import Email from "../utils/Email";
import Tokinazation from '../utils/Token';
import {SignupRequest, loginRequest , decodedToken} from '../utils/Interfaces'
import { CookieOptions } from 'express';

export const signUp: RequestHandler = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body as SignupRequest;
  
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
  
    // const url = `${req.protocol}://${req.get('host')}/`;
    // const sendEmail = new Email(newUser,url);
    // await sendEmail.sendWelcome();

    const token = new Tokinazation(newUser,res,201);
    token.createSendToken();
    
  });
  
export const login:RequestHandler = catchAsync(async (req, res, next) => {
    //get user based on email and password
    const { email, password } = req.body as loginRequest;
    if (!email || !password) {
      next(new AppError('Please provide email or password', 401));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password)))
      return next(new AppError('Incorrect email or Password', 401));
    // 3) send token
    const token = new Tokinazation(user,res,201);
    token.createSendToken();
    // res.send('hi')
  });

export const logout:RequestHandler = (req, res) => {
    const cookieOptions:CookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: 'localhost',
      path: '/',
    };
    res.cookie('jwt', 'logded out', cookieOptions);
    res.status(200).json({ status: 'success' });
  };
 

  interface userRequest extends Request {
    user?: IUser;
  }

export const protect:RequestHandler = catchAsync(async (req:userRequest, res, next) => {
    //get token from header
    let token = ' ';
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as decodedToken
    //get user
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('User does not exit', 401));
    }
    // check if user changed password after token issued
    if (currentUser.changePasswordAfter(decoded.iat)) {
      next(new AppError('User recently changed password', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  });
  
  export const strictTo =
  (...roles:string[]):RequestHandler =>
  (req:userRequest, res, next) => {
    if (!req.user?.role || !roles.includes(req.user.role)) {
      next(new AppError('You do not have permission', 401));
    }
    next();
  };

 