import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as crypto from 'crypto'
import { RequestHandler , Request, Response} from 'express';
import {User, IUser} from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/CatchAsync";
import Email from "../utils/Email";
import Tokinazation from '../utils/Token';
import {SignupRequest, loginRequest , decodedToken} from '../utils/Interfaces'
import { CookieOptions } from 'express';
import {userRequest} from '../utils/Interfaces';

interface userResponse extends Response {
  user?: IUser;
}

export const signUp: RequestHandler = catchAsync(async (req, res, next) => {
    const { name, email, password, passwordConfirm } = req.body as SignupRequest;
  
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
  
    const url = `${req.protocol}://${req.get('host')}/login`;
    const sendEmail = new Email(newUser,url);
    await sendEmail.sendWelcome();

    // const token = new Tokinazation(newUser,res,201);
    // token.createSendToken();
    res.status(200).json({
      status:'sucess',
      message:'new user',
      data:{
        User:newUser
      }
    })
    
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
    domain: 'ifile.onrender.com',
    path: '/',
  };
  res.cookie('jwt', 'logded out', cookieOptions);
  res.status(200).json({ status: 'success' });
  };
 

 

export const protect:RequestHandler = catchAsync(async (req:userRequest, res:userResponse, next) => {
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
    res.locals.user = currentUser as IUser;
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

export const forgotPassword:RequestHandler = catchAsync(async (req, res, next) => {
    // get email from user
    const {email} = req.body as loginRequest
    const user = await User.findOne({ email }) as IUser;
  
    if (!user) next(new AppError('No user with this email', 404));
    const resetToken = user?.createResetToken();
    await user?.save({ validateBeforeSave: false });
  
    try {
      const resetURL = `${req.protocol}://${req.get(
        'host'
      )}/api/user/resetPassword/${resetToken}`;
  
      await new Email(user, resetURL).sendResetPassword();
      res.status(200).json({
        status: 'success',
        message: 'token sent successfully!',
      });
    } catch (err) {
      if(user){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
      }
      return next(new AppError('There was an error sending the email. Try again later!',404))
    }
  });

export const resetPassword:RequestHandler = catchAsync(async (req, res, next) => {
    //get token from url
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
  
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date(Date.now() )},
    });
    if (!user) {
      next(new AppError('Token is invalid or has expire', 400));
    }else{
      const { password, passwordConfirm } = req.body as SignupRequest;
      user.password = password;
      user.passwordConfirm = passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
    }
    if(user){
      const token = new Tokinazation(user,res,200);
      token.createSendToken();
    }
  });

export const isLoggedIn:RequestHandler = catchAsync(async (req:userRequest, res:userResponse, next) => {
    if (req.cookies.jwt) {
      try {
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET || '') as decodedToken
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next(new AppError('Please loggin in with correct password or email',401));
        }
  
        if (currentUser.changePasswordAfter(decoded.iat)) {
          next(new AppError('User recently changed password', 401));
        }
  
        req.user = currentUser;
        res.locals.user = currentUser as IUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  });

export const updatePassword:RequestHandler = catchAsync(async (req:userRequest, res, next) => {
    const user = await User.findById(req.user?._id).select('+password');
    if (!(await user?.comparePassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError('Your password is incorrect', 401));
    }
  
    if(user){
      const { password, passwordConfirm } = req.body as SignupRequest;
      user.password = password;
      user.passwordConfirm = passwordConfirm;
      await user.save(); 
      const token = new Tokinazation(user,res,200);
      token.createSendToken();
    }
  });