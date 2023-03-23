const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const bookingRouter = require('./bookingRoutes');

const router = express.Router();

router.use('/:userId/reviews', reviewRouter);
router.use('/:userId/bookings', bookingRouter);

router.route('/signup').post(authController.signUp);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/me').get(userController.getMe, userController.getUser);
router
  .route('/updateInfo')
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateInfo
  );
router.route('/updatePassword').patch(authController.updatePassword);
router.route('/deleteActUser').delete(userController.deleteActUser);

// Needed role admin
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
