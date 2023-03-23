const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get tour data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('Tour not found 😓', 404));
  }

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour,
  });
});

exports.getLogin = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getSignup = (req, res, next) => {
  res.status(200).render('signUp', {
    title: 'SignUp',
  });
};

exports.getAccount = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getDeleteAccount = (req, res, next) => {
  res.status(200).render('deleteAccount', {
    title: 'Delete your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) const bookings
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});

exports.updateUserData = (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking') res.locals.alert = 'Your booking was seccessful!';
  next();
};
