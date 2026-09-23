const { ApiError } = require('../utils/apiError');
const { config } = require('../config/env');

const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Ushbu yo'nalish topilmadi: ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Serverda ichki xatolik yuz berdi';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  if (err.name === 'CastError') {
    error = ApiError.badRequest(`Yaroqsiz qiymat: ${err.path} = ${err.value}`);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'qiymat';
    error = ApiError.badRequest(`Ushbu ${field} allaqachon mavjud.`);
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((val) => val.message);
    error = ApiError.badRequest(`Validatsiya xatosi: ${messages.join(', ')}`);
  }

  if (err.name === 'JsonWebTokenError') {
    error = ApiError.unauthorized('Yaroqsiz token.');
  }
  if (err.name === 'TokenExpiredError') {
    error = ApiError.unauthorized('Token muddati tugagan.');
  }

  const responsePayload = {
    success: false,
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    ...(config.env === 'development' && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(responsePayload);
};

module.exports = { notFoundHandler, errorHandler };
