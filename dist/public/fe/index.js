"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
const signup_1 = __importDefault(require("./signup"));
const userSettings_1 = __importDefault(require("./userSettings"));
const upload_1 = __importDefault(require("./upload"));
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.logout');
const signupForm = document.querySelector('.signup');
const userDataForm = document.querySelector('.user-data-from');
const passwordForm = document.querySelector('.user-password-forms');
const uploadForm = document.querySelector('.file-upload');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        (0, login_1.default)(email, password);
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        (0, logout_1.default)();
    });
}
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        (0, signup_1.default)(name, email, password, passwordConfirm);
    });
}
if (userDataForm)
    userDataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        (0, userSettings_1.default)({ name, email }, 'data');
        // console.log({name,email})
    });
if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        await (0, userSettings_1.default)({ passwordCurrent, password, passwordConfirm }, 'password');
        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
        // console.log({passwordCurrent,password,passwordConfirm})
    });
}
if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', document.getElementById('title').value);
        form.append('description', document.getElementById('description').value);
        form.append('fileType', document.getElementById('fileType').value);
        const filesInput = document.getElementById('originalname');
        if (filesInput && filesInput.files && filesInput.files.length > 0) {
            form.append('files', filesInput.files[0]);
        }
        (0, upload_1.default)(form);
    });
}
//# sourceMappingURL=index.js.map