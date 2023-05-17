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
exports.downloadviaEmail = exports.downloadFile = exports.deleteFile = exports.getFile = exports.getAllFiles = exports.uploadFile = exports.upload = void 0;
const path_1 = __importDefault(require("path"));
const fileModel_1 = require("../models/fileModel");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const APIFeatures_1 = __importDefault(require("../utils/APIFeatures"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path_1.default.join(__dirname, '../public/files');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    },
});
// export const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb: FileFilterCallback) => {
//     const allowedFileTypes = ['pdf', 'audio', 'image', 'video'];
//     const fileExtension = path.extname(file.originalname).toLowerCase();
//     const fileType = fileExtension.substring(1);
//     if (allowedFileTypes.includes(fileType)) {
//       cb(null, true); // Accept the file
//     } else {
//       cb(new Error('Invalid file type')); // Reject the file
//     }
//   },
// }).array('files', 10);
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf|jpeg|jpg|png|mp3|mp4|wav|avi|mov/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            cb(new Error('Invalide file'));
        }
    },
}).array('files', 10);
exports.uploadFile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Access the uploaded files in req.files
    const uploadedFiles = req.files;
    // console.log(uploadedFiles);
    // Create new file document in the database
    const newFile = yield fileModel_1.File.create({
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
exports.downloadFile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fileModel_1.File.findById(req.params.id);
    if (!file) {
        return next(new AppError_1.default('File not found', 404));
    }
    file.downloadCount += 1;
    yield file.save();
    const filePath = path_1.default.join(__dirname, '..', 'public', 'files', file.fileUrl);
    const fileName = path_1.default.basename(filePath);
    const extension = path_1.default.extname(fileName);
    res.setHeader('Content-Disposition', `attachment; filename=${file.path}${extension}`);
    res.status(200).download(filePath, fileName);
}));
exports.downloadviaEmail = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = yield fileModel_1.File.findOne({ _id: req.params.id });
    if (!file) {
        return next(new AppError_1.default('File not found', 404));
    }
    // Send the email with the attachment
    const url = `${req.protocol}://${req.get('host')}/`;
    // /Users/clementbogyah/Desktop/iFILE/public/data/public/data/iFILE.jpeg"
    const filePath = path_1.default.join(__dirname, '..', 'public', 'files', file.fileUrl);
    // const email = new Email(req.user, url);
    // const attachments = [
    //   {
    //     filename: file.title,
    //     path: filePath,
    //   },
    // ];
    // console.log(filePath);
    // await email.send('emailDownload', 'Download attached', attachments);
    // Update the file's email count
    file.emailCount += 1;
    yield file.save();
    res.status(200).json({
        status: 'success',
        message: 'Email sent successfully',
        data: {
            file: file,
        },
    });
}));
//# sourceMappingURL=fileController.js.map