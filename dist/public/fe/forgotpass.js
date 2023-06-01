"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpass = exports.passforgot = void 0;
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const passforgot = async (email) => {
    try {
        const res = await axios_1.default.post('v1/api/users/forgotpassword', {
            email,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === "success") {
            (0, alert_1.showAlert)('success', 'reset token sent to Email');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        (0, alert_1.showAlert)('error', 'No user with this Email');
    }
};
exports.passforgot = passforgot;
const resetpass = async (password, passwordConfirm, token) => {
    try {
        const res = await axios_1.default.patch(`v1/api/users/resetpassword?token=${token}`, JSON.stringify({
            password,
            passwordConfirm
        }), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === "success") {
            (0, alert_1.showAlert)('success', 'Password set succesful');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
    }
    catch (error) {
        (0, alert_1.showAlert)('error', 'Something went wrong');
        // console.log(error)
    }
};
exports.resetpass = resetpass;
//# sourceMappingURL=forgotpass.js.map