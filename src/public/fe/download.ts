import axios, { AxiosResponse } from 'axios';

const download = async (fileId: string): Promise<void> => {
  try {
    const res: AxiosResponse<Blob> = await axios({
      method: 'GET',
      url: `/v1/api/files/download/${fileId}`,
      withCredentials: true,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Get the original filename from the Content-Disposition header
    const contentDisposition = res.headers['content-disposition'];
    const match = contentDisposition.match(/filename="?(.+?)"?$/);
    const originalFilename = match ? match[1] : 'unknown';

    // Create a temporary <a> element with the URL and click it to download the file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(res.data);
    link.setAttribute('download', originalFilename); // Set the original filename as the download filename
    document.body.appendChild(link);
    link.click();

    // Remove the temporary <a> element
    document.body.removeChild(link);
  } catch (error: any) {
    alert('You need to login first. Please try again.');
    // setTimeout(() => {
    //   window.location.href = '/signup';
    // }, 1500);
    // console.log(error.response.data.message);
    console.log(error);
  }
};

export default download;
