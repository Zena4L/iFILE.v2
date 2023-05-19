import login from './login';
import logout from './logout';
import signUp from './signup';
import updateSettings from './userSettings';
import uploadFile from './upload';

const loginForm = document.querySelector('.form') as HTMLFormElement;
const logoutBtn = document.querySelector('.logout') as HTMLFormElement
const signupForm = document.querySelector('.signup') as HTMLFormElement;
const userDataForm = document.querySelector('.user-data-from') as HTMLFormElement;
const passwordForm = document.querySelector('.user-password-forms') as HTMLFormElement;
const uploadForm = document.querySelector('.file-upload') as HTMLFormElement;

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

if(userDataForm)
    userDataForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        updateSettings({name,email},'data');
// console.log({name,email})
})

if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const passwordCurrent = (document.getElementById('password-current') as HTMLInputElement).value;
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const passwordConfirm = (document.getElementById('password-confirm') as HTMLInputElement).value;
  
      await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');
      (document.getElementById('password-current') as HTMLInputElement).value = '';
      (document.getElementById('password') as HTMLInputElement).value = '';
      (document.getElementById('password-confirm') as HTMLInputElement).value = '';
      // console.log({passwordCurrent,password,passwordConfirm})
    });
  }
  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = new FormData();
      form.append('title', (document.getElementById('title') as HTMLInputElement).value);
      form.append('description', (document.getElementById('description') as HTMLInputElement).value);
      form.append('fileType', (document.getElementById('fileType') as HTMLInputElement).value);
      
      const filesInput = document.getElementById('originalname') as HTMLInputElement;
      if (filesInput && filesInput.files && filesInput.files.length > 0) {
        form.append('files', filesInput.files[0]);
      }   
      uploadFile(form);
    });
  }
  
  
  