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
exports.profile = exports.signup = exports.login = exports.overview = void 0;
const fileModel_1 = require("../models/fileModel");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
// export const overview:RequestHandler = (req, res) => {
//     res.render('base', { title: 'Home Page' });
//   }
exports.overview = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fileModel_1.File.find();
    res.status(200).render('overview', {
        title: 'All Files',
        files,
    });
}));
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
//# sourceMappingURL=viewController.js.map