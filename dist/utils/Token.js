"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Tokinazation {
    constructor(user, res, statusCode) {
        this.user = user;
        this.res = res;
        this.statusCode = statusCode;
    }
    signToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || '', {
            expiresIn: process.env.JWT_EXPIRESIN,
        });
    }
    createSendToken() {
        const token = this.signToken(this.user._id);
        const cookieOptions = {
            maxAge: 3 * 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            domain: 'ifile.onrender.com',
            path: '/',
        };
        this.res.cookie('jwt', token, cookieOptions);
        this.user.password = '';
        this.res.status(this.statusCode).json({
            status: 'success',
            message: 'Token available',
            token,
            data: {
                user: this.user,
            },
        });
    }
}
exports.default = Tokinazation;
//# sourceMappingURL=Token.js.map