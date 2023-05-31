"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const signUp = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios_1.default.post('/v1/api/users/signup', {
            name,
            email,
            password,
            passwordConfirm,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(res);
        if (res.data.status === "sucess") {
            (0, alert_1.showAlert)('success', 'Sign-up successful');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
    }
    catch (err) {
        (0, alert_1.showAlert)('fail', 'Signup fail, Try again');
    }
};
exports.default = signUp;
//# sourceMappingURL=signup.js.map