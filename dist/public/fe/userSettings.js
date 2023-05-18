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
const updateSettings = (data, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = type === 'password' ? 'http://localhost:3000/v1/api/users/updatepassword' : 'http://localhost:3000/v1/api/users/updateme';
        const res = yield axios_1.default.patch(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.data.status === 'success') {
            alert('Update Successful!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    }
    catch (err) {
        alert(err.response.data.message);
    }
});
exports.default = updateSettings;
//# sourceMappingURL=userSettings.js.map