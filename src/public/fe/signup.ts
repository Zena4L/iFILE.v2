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
      if (res.data.status === "success") {
        showAlert('success', 'Sign-up successful');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (err: any) {
      showAlert('fail','Signup fail, Try again');
    }
  };
  

export default signUp;