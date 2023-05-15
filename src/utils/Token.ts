import { Response ,CookieOptions} from 'express';
import jwt from 'jsonwebtoken';
import {IUser} from '../models/userModel';



class Tokinazation {
  user:IUser;
  res:Response;
  statusCode:number;

  constructor(user:IUser, res:Response , statusCode:number){
    this.user = user;
    this.res = res;
    this.statusCode = statusCode;
  }
  private signToken(user:IUser):string{
    return jwt.sign({ id:user._id }, process.env.JWT_SECRET || '', {
          expiresIn: process.env.JWT_EXPIRESIN,
        });
  }
  createSendToken():void{
    const token = this.signToken(this.user._id);
    const cookieOptions:CookieOptions = {
      maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      domain: 'localhost',

      path: '/',
    };
    this.res.cookie('jwt', token, cookieOptions);
    this.user.password = '';
    this.res.status(this.statusCode).json({
      status: 'sucess',
      message: 'token available',
      token,
      data: {
        user:this.user
      },
    });
  }
}

export default Tokinazation;