"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const emailDownload = async (fileId) => {
    try {
        const res = await (0, axios_1.default)({
            method: 'GET',
            url: `/v1/api/files/email/${fileId}`,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === 'success') {
            (0, alert_1.showAlert)('success', 'email sent!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        (0, alert_1.showAlert)('success', 'You need to login first. Please try again.');
        setTimeout(() => {
            window.location.href = '/signup';
        }, 1500);
        console.log(error.response.data.message);
    }
};
exports.default = emailDownload;
//# sourceMappingURL=email.js.map