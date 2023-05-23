import axios, { AxiosResponse } from 'axios';
import { showAlert } from './alert';

const logout = async () => {
    try {
        const res: AxiosResponse = await axios({
        method: 'GET',
        url: '/v1/api/users/logout'
      });
      if ((res.data.status = "success")){
        showAlert('success', 'You are logged out');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } 
    } catch (err:any) {
      console.log(err.response);
    }
  };

  export default logout;