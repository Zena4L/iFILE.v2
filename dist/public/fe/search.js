"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const search = async (keyword) => {
    try {
        const res = await axios_1.default.post('http://localhost:3000/v1/api/files/searc', {
            keyword
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === "sucess") {
            // alert('Logged in successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (error) {
        //   alert('Incorrect Email or Password, Try again');
        console.log(error.response.data.message);
    }
};
exports.default = search;
//# sourceMappingURL=search.js.map