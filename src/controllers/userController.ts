import { RequestHandler } from "express";
import User from "../models/userModel";
import AppError from "../utils/AppError";
import catchAsync from "../utils/CatchAsync";

export const getAllUser = catchAsync(async (req, res, next) => {
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
