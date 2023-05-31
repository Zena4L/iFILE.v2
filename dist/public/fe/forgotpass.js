"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = passforgot;
//# sourceMappingURL=forgotpass.js.map