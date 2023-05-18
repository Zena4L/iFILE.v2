"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
import { login } from "./login";
const loginForm = document.querySelector('.form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        (0, login)(email, password);
    });
}
//# sourceMappingURL=index.js.map