import { RequestHandler } from "express";
import { File } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";

// export const overview:RequestHandler = (req, res) => {
//     res.render('base', { title: 'Home Page' });
//   }
export const overview:RequestHandler = catchAsync(async (req, res, next) => {
    const files = await File.find();
    res.status(200).render('overview', {
      title: 'All Files',
      files,
    });
  });

export const login:RequestHandler =(req, res, next) => {
    res.status(200).render('login', {
      title: 'Log into your Account',
    });
};
export const signup:RequestHandler = (req, res, next) => {
    res.status(200).render('signup', {
      title: 'Create Account',
    });
  };
  export const profile:RequestHandler = (req, res, next) => {
    res.status(200).render('profile', {
      title: 'Your Profile',
    });
  }