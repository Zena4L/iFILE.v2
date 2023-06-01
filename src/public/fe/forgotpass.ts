import axios, { AxiosResponse } from 'axios';
import { showAlert } from './alert';


interface LoginResponse {
    status: string;
    data: {
      message: string;
    };
  }
export const passforgot = async (email: string): Promise<void> => {
    try {
      const res: AxiosResponse<LoginResponse> = await axios.post(
        'v1/api/users/forgotpassword',
        {
          email,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.status === "success") {
        showAlert('success', 'reset token sent to Email');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (error:any) {
      showAlert('error', 'No user with this Email');
    }
  };

  export const resetpass = async (password: string, passwordConfirm: string, token: string) => {
    try {
      const res: AxiosResponse<LoginResponse> = await axios.patch(
        `v1/api/users/resetpassword?token=${token}`,
        JSON.stringify({
          password,
          passwordConfirm
        }),
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.data.status === "success") {
        showAlert('success', 'Password set succesful');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
    }
  }catch(error:any) {
      showAlert('error', 'Something went wrong');
      // console.log(error)
    }
  };
  