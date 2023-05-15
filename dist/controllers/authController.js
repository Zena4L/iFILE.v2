"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.strictTo = exports.protect = exports.logout = exports.login = exports.signUp = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const AppError_1 = __importDefault(require("../utils/AppError"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const Token_1 = __importDefault(require("../utils/Token"));
exports.signUp = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirm } = req.body;
    const newUser = yield userModel_1.User.create({
        name,
        email,
        password,
        passwordConfirm,
    });
    // const url = `${req.protocol}://${req.get('host')}/`;
    // const sendEmail = new Email(newUser,url);
    // await sendEmail.sendWelcome();
    const token = new Token_1.default(newUser, res, 201);
    token.createSendToken();
}));
exports.login = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get user based on email and password
    const { email, password } = req.body;
    if (!email || !password) {
        next(new AppError_1.default('Please provide email or password', 401));
    }
    // 2) Check if user exists && password is correct
    const user = yield userModel_1.User.findOne({ email }).select('+password');
    if (!user || !(yield user.comparePassword(password, user.password)))
        return next(new AppError_1.default('Incorrect email or Password', 401));
    // 3) send token
    const token = new Token_1.default(user, res, 201);
    token.createSendToken();
    // res.send('hi')
}));
const logout = (req, res) => {
    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        domain: 'localhost',
        path: '/',
    };
    res.cookie('jwt', 'logded out', cookieOptions);
    res.status(200).json({ status: 'success' });
};
exports.logout = logout;
exports.protect = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //get token from header
    let token = ' ';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    //get user
    const currentUser = yield userModel_1.User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError_1.default('User does not exit', 401));
    }
    // check if user changed password after token issued
    if (currentUser.changePasswordAfter(decoded.iat)) {
        next(new AppError_1.default('User recently changed password', 401));
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
}));
const strictTo = (...roles) => (req, res, next) => {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || !roles.includes(req.user.role)) {
        next(new AppError_1.default('You do not have permission', 401));
    }
    next();
};
exports.strictTo = strictTo;
//# sourceMappingURL=authController.js.map