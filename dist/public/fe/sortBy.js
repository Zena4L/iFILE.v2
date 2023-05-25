"use strict";
// import axios, { AxiosResponse } from 'axios';
// import { showAlert } from './alert';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const sortBy = async (sort:string) => {
//     try {
//         const res: AxiosResponse = await axios({
//         method: 'GET',
//         url: `/v1/api/files?fileType=${sort}`
//       });
//     //   console.log(res.data.data.files);
//       const files = res.data.data.files;
//       if ((res.data.status = "success")){
//         showAlert('success', 'Loading ... ');
//         // setTimeout(() => {
//         //   window.location.href = '/';
//         // }, 1500);
//       } 
//     } catch (err:any) {
//       console.log(err.response);
//     }
//   };
// export default sortBy;
const axios_1 = __importDefault(require("axios"));
const renderFiles = (files) => {
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = '';
    for (const file of files) {
        const card = document.createElement('div');
        card.className = 'card flex justify-between border-b-2 pb-5 pt-5 rounded-md py-2 px-4 grid grid-cols-6 place-items-center';
        const fileType = document.createElement('div');
        fileType.className = 'file-thumbnail-here';
        fileType.innerHTML = `<span>${file.fileType}</span>`;
        card.appendChild(fileType);
        const fileName = document.createElement('div');
        fileName.className = 'file-name';
        fileName.textContent = file.title;
        card.appendChild(fileName);
        const preview = document.createElement('div');
        preview.className = 'svg-here';
        preview.innerHTML = `
        <a class="flex gap-3" href="/${file.slug}">
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        </a>
      `;
        card.appendChild(preview);
        const downloadBtn = document.createElement('div');
        downloadBtn.className = 'svg-here';
        downloadBtn.innerHTML = `
        <button id="downloadBtn" class="flex gap-3" data-id="${file._id}">Download
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>
          </svg>
        </button>
      `;
        card.appendChild(downloadBtn);
        const emailBtn = document.createElement('div');
        emailBtn.className = 'svg-here';
        emailBtn.innerHTML = `
        <button id="emailBtn" class="flex gap-3" data-id="${file._id}">Send Via Mail
          <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
          </svg>
        </button>
      `;
        card.appendChild(emailBtn);
        cardContainer.appendChild(card);
    }
};
const sortBy = async (sort) => {
    try {
        const res = await axios_1.default.get(`/v1/api/files?fileType=${sort}`);
        const files = res.data.data.files;
        if ((res.data.status = "success")) {
            // showAlert('success', 'Loading ... ');
            setTimeout(() => {
                renderFiles(files);
            }, 1500);
        }
    }
    catch (err) {
        console.log(err.response);
    }
};
exports.default = sortBy;
//# sourceMappingURL=sortBy.js.map