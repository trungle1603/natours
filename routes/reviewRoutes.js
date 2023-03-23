const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// POST /tours/234asd/reviews
// --> /reviews
const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getAllReviews);
router.route('/:id').get(reviewController.getReview);

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/')
  .post(reviewController.setTourUserIds, reviewController.createReview);

router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
