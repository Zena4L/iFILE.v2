"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.getFile = exports.getAllFiles = exports.uploadFile = exports.fileUpload = void 0;
const path_1 = __importDefault(require("path"));
const fileModel_1 = require("../models/fileModel");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const APIFeatures_1 = __importDefault(require("../utils/APIFeatures"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const multer_1 = __importDefault(require("multer"));
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/data');
    },
    filename: (req, file, cb) => {
        //file-id-timestamp.ext
        const ext = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    },
});
const multerFilter = (req, file, cb) => {
    const filetypes = /pdf|jpeg|jpg|png|mp3|mp4|wav|avi|mov/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check MIME type
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
});
exports.fileUpload = upload.array('originalname', 10);
exports.uploadFile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, fileType } = req.body;
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
    console.log(uploadedFile);
    res.status(200).json({
        status: 'success',
        message: 'file successfully uploaded',
        data: {
        // file: newFile,
        },
    });
}));
exports.getAllFiles = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new APIFeatures_1.default(fileModel_1.File.find(), req.query)
        .filter()
        .sort()
        .limitedField()
        .pagination();
    const files = yield features.query;
    res.status(200).json({
        status: 'ok',
        message: 'getting files',
        length: files.length,
        data: {
            files,
        },
    });
}));
exports.getFile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fileModel_1.File.findById(req.params.id);
    if (!file)
        next(new AppError_1.default('No file with that id', 404));
    res.status(200).json({
        status: 'success',
        message: 'get file',
        data: {
            files: file,
        },
    });
}));
exports.deleteFile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fileModel_1.File.findByIdAndDelete(req.params.id);
    if (!file) {
        return next(new AppError_1.default('File not found', 404));
    }
    res.status(200).json({
        status: 'ok',
        data: null,
    });
}));
//# sourceMappingURL=fileController.js.map