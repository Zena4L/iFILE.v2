import axios, { AxiosResponse } from 'axios';

const logout = async () => {
    try {
        const res: AxiosResponse = await axios({
        method: 'GET',
        url: 'http://localhost:3000/v1/api/users/logout'
      });
      if ((res.data.status = "success")){
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } 
    } catch (err:any) {
      console.log(err.response);
    }
  };

  export default logout;