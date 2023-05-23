"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const alert_1 = require("./alert");
const logout = async () => {
    try {
        const res = await (0, axios_1.default)({
            method: 'GET',
            url: '/v1/api/users/logout'
        });
        if ((res.data.status = "success")) {
            (0, alert_1.showAlert)('success', 'You are logged out');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (err) {
        console.log(err.response);
    }
};
exports.default = logout;
//# sourceMappingURL=logout.js.map