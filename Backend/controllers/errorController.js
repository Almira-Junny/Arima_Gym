const AppError = require('../utils/appError');

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(err.statusCode).render('error', {
      title: 'Có lỗi xảy ra. Vui lòng thử lại sau',
      msg: err.message,
    });
  }
};

const sendErrorPro = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Có lỗi xảy ra. Vui lòng thử lại sau',
    });
  }
};

const handleCastError = (err) => {
  const message = `Trường ${err.path} có giá trị không hợp lệ: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  const value = Object.values(err.keyValue)[0];
  const message = `${value} đã được sử dụng. Vui lòng sử dụng giá trị khác`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map((el) => el.message)
    .join('. ');
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Token không hợp lệ. Vui lòng đăng nhập lại', 401);

const handleTokenExpiredError = () =>
  new AppError('Token hết hạn. Vui lòng đăng nhập lại', 401);

const handleLimitFileMulter = () =>
  new AppError('Quá nhiều files. Vui lòng tải lên đúng số lượng', 400);

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV !== 'production') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err, message: err.message };

    switch (err.name) {
      case 'CastError':
        error = handleCastError(error);
        break;
      case 'ValidationError':
        error = handleValidationError(error);
        break;
      case 'JsonWebTokenError':
        error = handleJWTError();
        break;
      case 'TokenExpiredError':
        error = handleTokenExpiredError();
        break;
      default:
        break;
    }

    switch (err.code) {
      case 11000:
        error = handleDuplicateError(error);
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        error = handleLimitFileMulter();
        break;
      default:
        break;
    }
    sendErrorPro(error, req, res);
  }
};

module.exports = globalErrorHandler;
