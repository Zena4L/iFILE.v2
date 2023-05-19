import axios, { AxiosResponse } from 'axios';
const updateSettings = async (data: any, type: string): Promise<void> => {
    try {
      const url = type === 'password' ? 'http://localhost:3000/v1/api/users/updatepassword' : 'http://localhost:3000/v1/api/users/updateme';
      const res:AxiosResponse = await axios.patch(url, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (res.data.status === 'success') {
        alert('Update Successful!');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };
  
export default updateSettings;