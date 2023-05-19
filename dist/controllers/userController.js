"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMe = exports.updateMe = exports.getUser = exports.getAllUser = void 0;
const userModel_1 = require("../models/userModel");
const AppError_1 = __importDefault(require("../utils/AppError"));
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
exports.getAllUser = (0, CatchAsync_1.default)(async (req, res, next) => {
    const users = await userModel_1.User.find().select('-password');
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
});
exports.getUser = (0, CatchAsync_1.default)(async (req, res, next) => {
    const user = await userModel_1.User.findById(req.params.id);
    if (!user)
        next(new AppError_1.default('No user by this ID', 404));
    res.status(200).json({
        status: 'succes',
        message: 'get user by Id',
        data: {
            user,
        },
    });
});
exports.updateMe = (0, CatchAsync_1.default)(async (req, res, next) => {
    var _a;
    const { password, passwordConfirm } = req.body;
    if (password || passwordConfirm) {
        next(new AppError_1.default('This route is not for reseting password', 401));
    }
    const filtedBody = filterObj(req.body, 'name', 'email', 'userName');
    const updatedUser = await userModel_1.User.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, filtedBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            updatedUser,
        },
    });
});
exports.deleteMe = (0, CatchAsync_1.default)(async (req, res, next) => {
    var _a;
    const user = await userModel_1.User.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, { active: false });
    res.status(204).json({
        status: 'success',
        message: 'deleted successfully',
        data: null,
    });
});
//# sourceMappingURL=userController.js.map