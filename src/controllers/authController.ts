import * as jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as crypto from 'crypto'
import { RequestHandler } from 'express';
import {User} from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/CatchAsync";
import Email from "../utils/Email";
import Tokinazation from '../utils/Token';

// export const signUp = catchAsync(async (req, res, next) => {
//     const newUser = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       passwordConfirm: req.body.passwordConfirm,
//       userName: req.body.name.split(' ')[0],
//     });
  
//     // const url = `${req.protocol}://${req.get('host')}/`;
//     // const email = new Email(newUser,url);
//     // await email.sendWelcome();
//     // createSendToken(newUser, res, 201);

//     // const token = new Tokinazation(newUser,res,201);
//     // token.createSendToken();
//     res.status(200).json({
//         status:'ok'
//     })

//   });

interface SignupRequest {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }
  
  export const signUp: RequestHandler = async (req, res, next) => {
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
    
  };
  