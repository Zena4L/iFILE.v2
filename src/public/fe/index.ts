import login from './login';
import logout from './logout';
import signUp from './signup';

const loginForm = document.querySelector('.form') as HTMLFormElement;
const logoutBtn = document.querySelector('.logout') as HTMLFormElement
const signupForm = document.querySelector('.signup') as HTMLFormElement;

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    login(email, password);
  });
}

if (logoutBtn){
    logoutBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        logout();
    });
}
if(signupForm){
    signupForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value
        const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value
        signUp(name,email,password,passwordConfirm)
    })
}


