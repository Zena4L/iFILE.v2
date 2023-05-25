
import { showAlert } from './alert';

const sortBy = async (sort: string) => {
  if (sort === 'NONE') {
    showAlert('success', 'Loading ... ');
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  } else {
    showAlert('success', 'Loading ... ');
    setTimeout(() => {
      window.location.href = `?fileType=${sort}`;
    }, 1500);
  }
  localStorage.setItem('selectedSort', sort);
};

window.addEventListener('DOMContentLoaded', () => {
  const sortByElement = document.getElementById('fileType') as HTMLSelectElement;
  const selectedSort = localStorage.getItem('selectedSort');
  if (sortByElement && selectedSort) {
    sortByElement.value = selectedSort;
  }
});



 



  
  
  

export default sortBy;
