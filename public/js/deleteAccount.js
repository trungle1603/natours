/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const deleteAccount = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: '/api/v1/users/deleteActUser',
      // url: 'http://127.0.0.1:3000/api/v1/users/deleteActUser',
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Delete successful ✔ Back to home in 1s');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
