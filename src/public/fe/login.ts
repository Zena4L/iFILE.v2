import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  status: string;
  data: {
    message: string;
  };
}
const login = async (email: string, password: string): Promise<void> => {
  try {
    const res: AxiosResponse<LoginResponse> = await axios.post(
      '/v1/api/users/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.data.status === "sucess") {
      alert('Logged in successfully!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  } catch (error:any) {
    alert('Incorrect Email or Password, Try again');
    console.log(error.response.data.message);
  }
};

export default login;