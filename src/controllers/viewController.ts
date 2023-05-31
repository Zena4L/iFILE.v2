import { RequestHandler } from "express";
import { File } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";
import AppError from "../utils/AppError";
import APIFeatures from "../utils/APIFeatures";


export const overview: RequestHandler = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(File.find(), req.query)
    .filter()
    .sort()
    .limitedField()
    .pagination();

  const files = await features.query;

  const totalDocuments = await File.countDocuments();
  const totalPages = Math.ceil(totalDocuments / 10);
  const currentPage = req.query.page ? parseInt(req.query.page as string) : 1;

  res.status(200).render('overview', {
    title: 'All Files',
    files,
    totalPages,
    currentPage,
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
    const file = await File.findOne({ slug: req.params.slug })
    if (!file) {
      return next(new AppError('There is no file with that name', 404));
    }
    if (res.locals.user) {
      res.status(200).render('details', {
        title: `${file.title} - File server`,
        file,
      });
    } else {
      return res.redirect('/login'); 
    }
  });
 
  export const searchFile: RequestHandler = catchAsync(async (req, res, next) => {
    const { keyword } = req.body;
    const searchResults = await File.find({ title: { $regex: `^.*${keyword}.*$`, $options: 'i' } });
    console.log(keyword);
  
    if (searchResults.length === 0) {
      return next(new AppError('No file with that Name', 404));
    }
    if (res.locals.user) {
      res.status(200).render('details', {
        title: 'All Files',
        files: searchResults, 
      });
    }else{
      res.status(200).render('overview', {
        title: 'All Files',
        files: searchResults, 
      });
    }
  
  });
  
  