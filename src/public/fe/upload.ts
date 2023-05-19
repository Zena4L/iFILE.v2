import axios, { AxiosResponse } from 'axios';

const uploadFile = async (form:FormData): Promise<void> => {
  try {
    const res: AxiosResponse<any> = await axios.post(
      'http://localhost:3000/v1/api/files/upload',
      form,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  
    if (res.data.status === "success") {
      alert('File uploaded successfully!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  } catch (err: any) {
    // alert('File format not supported');
    console.log(err);
  }
};

export default uploadFile;