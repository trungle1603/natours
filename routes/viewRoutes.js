const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewController.alerts);

router.get('/', authController.isLoggedIn, viewController.getOverview);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLogin);
router.get('/signUp', authController.isLoggedIn, viewController.getSignup);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
router.get(
  '/delete-account',
  authController.protect,
  viewController.getDeleteAccount
);

module.exports = router;
