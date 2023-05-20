import axios, { AxiosResponse } from 'axios';

const emailDownload = async (fileId: string): Promise<void> => {
  try {
    const res: AxiosResponse<any> = await axios({
      method: 'GET',
      url: `http://localhost:3000/v1/api/files/email/${fileId}`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.data.status === 'success') {
      alert('Email sent successfully');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  } catch (error: any) {
    alert('You need to login first. Please try again.');
    setTimeout(() => {
      window.location.href = '/signup';
    }, 1500);
    console.log(error.response.data.message);
  }
};

export default emailDownload;