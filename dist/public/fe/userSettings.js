"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? '/v1/api/users/updatepassword' : '/v1/api/users/updateme';
        const res = await axios_1.default.patch(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === 'success') {
            alert('Update Successful!');
            setTimeout(() => {
                window.location.href = '/login';
            }, 1500);
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
};
exports.default = updateSettings;
//# sourceMappingURL=userSettings.js.map