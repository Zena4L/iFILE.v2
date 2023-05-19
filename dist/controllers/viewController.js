"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = exports.profile = exports.signup = exports.login = exports.overview = void 0;
const fileModel_1 = require("../models/fileModel");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const AppError_1 = __importDefault(require("../utils/AppError"));
// export const overview:RequestHandler = (req, res) => {
//     res.render('base', { title: 'Home Page' });
//   }
exports.overview = (0, CatchAsync_1.default)(async (req, res, next) => {
    const files = await fileModel_1.File.find();
    res.status(200).render('overview', {
        title: 'All Files',
        files,
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
    // 1. Get file data
    const file = await fileModel_1.File.findOne({ slug: req.params.slug });
    // 2. Check if file exists
    if (!file) {
        return next(new AppError_1.default('There is no file with that name', 404));
    }
    // 3. Check if user is logged in
    if (res.locals.user) {
        // 4. Render the template with file data
        res.status(200).render('details', {
            title: `${file.title} - File server`,
            file,
        });
    }
    else {
        return res.redirect('/login'); // If not logged in, redirect to login page
    }
});
//# sourceMappingURL=viewController.js.map