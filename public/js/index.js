/* eslint-disable */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import '@babel/polyfill';
import { signUp } from './signUp';
import { login } from './login';
import { logout } from './logout';
import { deleteAccount } from './deleteAccount';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { displayMap } from './mapbox';
import { showAlert } from './alert';

const mapBox = document.getElementById('map');

const formLogin = document.querySelector('.form--login');
const formSignUp = document.querySelector('.form--signup');
const formUpdateInfo = document.querySelector('.form-user-info');
const formUpdatePassword = document.querySelector('.form-user-password');

const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');
const deleteAccountBtn = document.querySelector('.btn--delete-account');

const alertMessage = document.querySelector('body').dataset.alert;

// DELEGATION
if (alertMessage) showAlert('success', alertMessage, 20);

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (formSignUp) {
  formSignUp.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signUp(name, email, password, passwordConfirm);
  });
}

if (formLogin) {
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();

    login(email.value, password.value);
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', () => {
    logout();
  });
}

if (formUpdateInfo) {
  formUpdateInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });
}

if (formUpdatePassword) {
  formUpdatePassword.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const password = document.getElementById('password').value;
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { password, passwordCurrent, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Updated';
    document.getElementById('password').value = '';
    document.getElementById('password-current').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener('click', (e) => {
    deleteAccount();
  });
}
