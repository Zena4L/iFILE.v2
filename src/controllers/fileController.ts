import path from "path";
import { RequestHandler,Request } from "express";
import { File,IFile } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";
import APIFeatures from "../utils/APIFeatures";
import AppError from "../utils/AppError";
import multer, {FileFilterCallback} from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/files');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb: FileFilterCallback) => {
    const allowedFileTypes = ['pdf', 'audio', 'image', 'video'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileType = fileExtension.substring(1);
  
    if (allowedFileTypes.includes(fileType)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type')); // Reject the file
    }
  },
}).array('files', 10);

export const uploadFile:RequestHandler = catchAsync(async (req, res, next) => {
        // Access the uploaded files in req.files
        const uploadedFiles = req.files as Express.Multer.File[];
        // console.log(uploadedFiles);

        // Create new file document in the database
        const newFile = await File.create({
          title: req.body.title,
          description: req.body.description,
          fileType: req.body.fileType,
          fileUrl: uploadedFiles[0].filename,
          path: uploadedFiles[0].originalname,
        });
  
        // Return a response to the client
        res.status(200).json({
          status: 'success',
          message: 'File successfully uploaded',
          data: {
            file: newFile,
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