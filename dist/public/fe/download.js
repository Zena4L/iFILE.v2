"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const download = async (fileId) => {
    try {
        const res = await (0, axios_1.default)({
            method: 'GET',
            url: `http://localhost:3000/v1/api/files/download/${fileId}`,
            withCredentials: true,
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Get the original filename from the Content-Disposition header
        const contentDisposition = res.headers['content-disposition'];
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        const originalFilename = match ? match[1] : 'unknown';
        // Create a temporary <a> element with the URL and click it to download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(res.data);
        link.setAttribute('download', originalFilename); // Set the original filename as the download filename
        document.body.appendChild(link);
        link.click();
        // Remove the temporary <a> element
        document.body.removeChild(link);
    }
    catch (error) {
        alert('You need to login first. Please try again.');
        // setTimeout(() => {
        //   window.location.href = '/signup';
        // }, 1500);
        // console.log(error.response.data.message);
        console.log(error);
    }
};
exports.default = download;
//# sourceMappingURL=download.js.map