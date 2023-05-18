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
exports.login = void 0;
const axios_1 = __importDefault(require("axios"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post('http://localhost:3000/v1/api/users/login', {
            email,
            password,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === "success") {
            alert('Logged in successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        alert('Incorrect Email or Password, Try again');
        console.log(error.response.data.message);
    }
});
exports.login = login;
//# sourceMappingURL=login.js.map