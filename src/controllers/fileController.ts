import path from "path";
import { RequestHandler,Request } from "express";
import { File,IFile } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";
import APIFeatures from "../utils/APIFeatures";
import AppError from "../utils/AppError";
import multer, { FileFilterCallback } from 'multer'

const multerStorage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, 'public/data');
    },
    filename: (req: Request, file, cb) => {
      //file-id-timestamp.ext
      const ext = file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const multerFilter = (req: Request, file:Express.Multer.File, cb: FileFilterCallback) => {
    const filetypes = /pdf|jpeg|jpg|png|mp3|mp4|wav|avi|mov/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  
  
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  
  export const fileUpload = upload.array('originalname', 10);


  
export const uploadFile: RequestHandler = catchAsync(async (req, res, next) => {
    const { title, description, fileType } = req.body as IFile;
    const uploadedFile = req.files;

    // const newFile = await File.create({
    //   title,
    //   description,
    //   fileType,
    //   fileUrl: req.files[0].filename,
    //   path: req.files[0].originalname,
    //   uploadedBy: req.user!.id, // make sure user is defined before accessing its properties
    // });



    console.log(req.body);
    console.log(uploadedFile)
  
    res.status(200).json({
      status: 'success',
      message: 'file successfully uploaded',
      data: {
        // file: newFile,
      },
    });
  });
  


export const getAllFiles:RequestHandler = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(File.find(), req.query)
      .filter()
      .sort()
      .limitedField()
      .pagination();
  
    const files = await features.query;
    res.status(200).json({
      status: 'ok',
      message: 'getting files',
      length: files.length,
      data: {
        files,
      },
    });
});
export const getFile:RequestHandler = catchAsync(async (req, res, next) => {
    const file = await File.findById(req.params.id);
    if (!file) next(new AppError('No file with that id', 404));
    res.status(200).json({
      status: 'success',
      message: 'get file',
      data: {
        files: file,
      },
    });
  });
export const deleteFile:RequestHandler = catchAsync(async (req, res, next) => {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return next(new AppError('File not found', 404));
    }
    res.status(200).json({
      status: 'ok',
      data: null,
    });
  });