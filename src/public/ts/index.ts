import { login } from './login';

const loginForm = document.querySelector('.form') as HTMLFormElement;

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        login(email, password);
    });
}
