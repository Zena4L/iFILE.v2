"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const uploadFile = async (form) => {
    try {
        const res = await axios_1.default.post('/v1/api/files/upload', form, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (res.data.status === "success") {
            alert('File uploaded successfully!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (err) {
        // alert('File format not supported');
        console.log(err);
    }
};
exports.default = uploadFile;
//# sourceMappingURL=upload.js.map