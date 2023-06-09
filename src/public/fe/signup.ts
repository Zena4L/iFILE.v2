import axios, { AxiosResponse } from 'axios';
import { showAlert } from './alert';

interface LoginResponse {
    status: string;
    data: {
      message: string;
    };
  }
  const signUp = async (name: string, email: string, password: string, passwordConfirm: string) => {
    try {
        const res: AxiosResponse<LoginResponse> = await axios.post(
            '/v1/api/users/signup',
            {
              name,
              email,
              password,
              passwordConfirm,
            },
            {
              withCredentials: true,
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );       
          console.log(res)   
      if (res.data.status === "sucess") {
        showAlert('success', 'Sign-up successful');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } catch (err: any) {

      if (err.response.data.error.name === 'ValidationError'){
        showAlert('error','Password and PasswordConfirm do not match')
      }else{
        showAlert('error','Failed, Try Again later')
      }
    }
  };
  

export default signUp;