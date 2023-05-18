import axios, { AxiosResponse } from 'axios';
import {IUser} from '../../models/userModel';

interface LoginResponse {
    status: string;
    data: {
      message: string;
    };
  }
  const signUp = async (name: string, email: string, password: string, passwordConfirm: string) => {
    try {
        const res: AxiosResponse<LoginResponse> = await axios.post(
            'http://localhost:3000/v1/api/users/signup',
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
        alert('sign-up successfully!');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (err: any) {
      alert('Signup fail, Try again');
      console.log(err.response.data.message);
    }
  };
  

export default signUp;