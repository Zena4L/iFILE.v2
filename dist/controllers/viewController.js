"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFile = exports.getFile = exports.profile = exports.signup = exports.login = exports.overview = void 0;
const fileModel_1 = require("../models/fileModel");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const APIFeatures_1 = __importDefault(require("../utils/APIFeatures"));
exports.overview = (0, CatchAsync_1.default)(async (req, res, next) => {
    const features = new APIFeatures_1.default(fileModel_1.File.find(), req.query)
        .filter()
        .sort()
        .limitedField()
        .pagination();
    const files = await features.query;
    const totalDocuments = await fileModel_1.File.countDocuments();
    const totalPages = Math.ceil(totalDocuments / 10);
    const currentPage = req.query.page ? parseInt(req.query.page) : 1;
    res.status(200).render('overview', {
        title: 'All Files',
        files,
        totalPages,
        currentPage,
    });
});
const login = (req, res, next) => {
    res.status(200).render('login', {
        title: 'Log into your Account',
    });
};
exports.login = login;
const signup = (req, res, next) => {
    res.status(200).render('signup', {
        title: 'Create Account',
    });
};
exports.signup = signup;
const profile = (req, res, next) => {
    res.status(200).render('profile', {
        title: 'Your Profile',
    });
};
exports.profile = profile;
exports.getFile = (0, CatchAsync_1.default)(async (req, res, next) => {
    const file = await fileModel_1.File.findOne({ slug: req.params.slug });
    if (!file) {
        return next(new AppError_1.default('There is no file with that name', 404));
    }
    if (res.locals.user) {
        res.status(200).render('details', {
            title: `${file.title} - File server`,
            file,
        });
    }
    else {
        return res.redirect('/login');
    }
});
exports.searchFile = (0, CatchAsync_1.default)(async (req, res, next) => {
    const { keyword } = req.body;
    const searchResults = await fileModel_1.File.find({ title: { $regex: `^.*${keyword}.*$`, $options: 'i' } });
    console.log(keyword);
    if (searchResults.length === 0) {
        return next(new AppError_1.default('No file with that Name', 404));
    }
    if (res.locals.user) {
        res.status(200).render('details', {
            title: 'All Files',
            files: searchResults,
        });
    }
    else {
        res.status(200).render('overview', {
            title: 'All Files',
            files: searchResults,
        });
    }
});
//# sourceMappingURL=viewController.js.map