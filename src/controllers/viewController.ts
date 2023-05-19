import { RequestHandler } from "express";
import { File } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";
import AppError from "../utils/AppError";

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
  export const getFile: RequestHandler = catchAsync(async (req, res, next) => {
    // 1. Get file data
    const file = await File.findOne({ slug: req.params.slug })
  
    // 2. Check if file exists
    if (!file) {
      return next(new AppError('There is no file with that name', 404));
    }
    // 3. Check if user is logged in
    if (res.locals.user) {
      // 4. Render the template with file data
      res.status(200).render('details', {
        title: `${file.title} - File server`,
        file,
      });
    } else {
      return res.redirect('/login'); // If not logged in, redirect to login page
    }
  });
  