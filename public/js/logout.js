/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
      // url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if ((res.data.status = 'success')) {
      showAlert('success', 'Logout successful ✔ Back to home in 1s');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Something when wrong 😓');
  }
};
