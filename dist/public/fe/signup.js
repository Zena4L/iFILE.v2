"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const signUp = async (name, email, password, passwordConfirm) => {
    try {
        const res = await axios_1.default.post('http://localhost:3000/v1/api/users/signup', {
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
            alert('sign-up successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (err) {
        alert('Signup fail, Try again');
        console.log(err.response.data.message);
    }
};
exports.default = signUp;
//# sourceMappingURL=signup.js.map