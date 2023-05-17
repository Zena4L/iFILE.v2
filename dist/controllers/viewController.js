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
const pug_1 = __importDefault(require("pug"));
const path_1 = __importDefault(require("path"));
// export const overview:RequestHandler = catchAsync(async (req, res, next) => {
//     const files = await File.find();
//     res.status(200).render('overview', {
//       title: 'All Files',
//       files,
//     });
//   });
exports.overview = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fileModel_1.File.find();
    const templatePath = path_1.default.join(__dirname, 'views', 'base.pug');
    const data = {
        title: 'All Files',
        files,
    };
    const htmlOutput = pug_1.default.renderFile(templatePath, data);
    res.send(htmlOutput);
}));
exports.login = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('login', {
        title: 'Log into your Account',
    });
}));
exports.signup = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('signup', {
        title: 'Create Account',
    });
}));
exports.profile = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render('profile', {
        title: 'Your Profile',
    });
}));
//# sourceMappingURL=viewController.js.map