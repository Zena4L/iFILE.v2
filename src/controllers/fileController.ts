import path from "path";
import { RequestHandler,Request } from "express";
import { File,IFile } from "../models/fileModel";
import catchAsync from "../utils/CatchAsync";
import APIFeatures from "../utils/APIFeatures";
import AppError from "../utils/AppError";




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