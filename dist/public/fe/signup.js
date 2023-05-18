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
const axios_1 = __importDefault(require("axios"));
const signUp = (name, email, password, passwordConfirm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post('http://localhost:3000/v1/api/users/signup', {
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
});
exports.default = signUp;
//# sourceMappingURL=signup.js.map