/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51JLICPARf1pREySq5PTZ4IA2dva1IuMFHRUvXT9fX0CxrhMz4g0rtUKNQYnQC33btgIoeV9kfgfMVGhgDaQ5ICgo00fQxki1Y5'
);

export const bookTour = async (tourId, res) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
      // `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
