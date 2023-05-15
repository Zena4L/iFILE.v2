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
exports.getAllUser = void 0;
const userModel_1 = require("../models/userModel");
const AppError_1 = __importDefault(require("../utils/AppError"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
exports.getAllUser = (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.User.find().select('-password');
    if (!users)
        next(new AppError_1.default('No users found', 404));
    res.status(200).json({
        status: 'success',
        length: users.length,
        message: 'All Users',
        data: {
            users,
        },
    });
}));
//# sourceMappingURL=userController.js.map