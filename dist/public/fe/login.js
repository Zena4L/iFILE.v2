"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const login = async (email, password) => {
    try {
        const res = await axios_1.default.post('/v1/api/users/login', {
            email,
            password,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === "success") {
            // alert('Logged in successfully!');
            (0, alert_1.showAlert)('success', 'Logged in successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        (0, alert_1.showAlert)('error', error.response.data.message);
    }
};
exports.default = login;
//# sourceMappingURL=login.js.map