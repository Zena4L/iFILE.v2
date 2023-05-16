import {User,IUser} from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/CatchAsync";
import { RequestHandler,Request } from "express";
import { SignupRequest } from "../utils/Interfaces";
import { Obj } from "../utils/Interfaces";

interface userRequest extends Request {
  user?: IUser;
}

const filterObj = (obj: Obj, ...allowedFields: string[]): Obj => {
  const newObj: Obj = {};
  Object.keys(obj).forEach((el: string) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};


export const getAllUser:RequestHandler = catchAsync(async (req, res, next) => {
    const users = await User.find().select('-password');
    if (!users) next(new AppError('No users found', 404));
    res.status(200).json({
      status: 'success',
      length: users.length,
      message: 'All Users',
      data: {
        users,
      },
    });
  });

export const getUser:RequestHandler = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) next(new AppError('No user by this ID', 404));
  
    res.status(200).json({
      status: 'succes',
      message: 'get user by Id',
      data: {
        user,
      },
    });
  });
export const updateMe:RequestHandler = catchAsync(async (req:userRequest, res, next) => {
    const {password,passwordConfirm} = req.body as SignupRequest
    if (password || passwordConfirm) {
      next(new AppError('This route is not for reseting password', 401));
    }
    const filtedBody = filterObj(req.body, 'name', 'email','userName');
    const updatedUser = await User.findByIdAndUpdate(req.user?.id, filtedBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedUser,
      },
    });
  });
  export const deleteMe:RequestHandler = catchAsync(async (req:userRequest, res, next) => {
    const user = await User.findByIdAndUpdate(req.user?.id, { active: false });
    res.status(204).json({
      status: 'success',
      message: 'deleted successfully',
      data: null,
    });
  });