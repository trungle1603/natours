const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}. 😓`;
  return new AppError(message, 400);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value} 😓`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please login again 😓', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please login again ⌛', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      name: err.name,
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something when wrong 😓',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong! 😓',
    });
  }

  // B) RENDERED WEBSITE
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something when wrong 😓',
      msg: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);

  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Please try again later! 😓',
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    // Error sai url
    if (err.name === 'CastError') error = handleCastErrorDB(error);

    // Error duplicate
    if (error.code === 11000) error = handleDuplicateErrorDB(error);

    // Error JWT signature
    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);

    // Error JWT expired
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(error);

    sendErrorProd(err, req, res);
  }
};
