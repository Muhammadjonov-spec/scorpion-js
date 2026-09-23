import { ApiError } from '../utils/apiError.js';
import { config } from '../config/env.js';

export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Ushbu yo'nalish topilmadi: ${req.originalUrl}`));
};

export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Agar oddiy Error bo'lsa yoki ApiError bo'lmasa
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Serverda ichki xatolik yuz berdi';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  // Mongoose CastError (masalan, noto'g'ri ObjectId)
  if (err.name === 'CastError') {
    error = ApiError.badRequest(`Yaroqsiz qiymat: ${err.path} = ${err.value}`);
  }

  // Mongoose Duplicate Key Error (11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'qiymat';
    error = ApiError.badRequest(`Ushbu ${field} allaqachon mavjud.`);
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((val) => val.message);
    error = ApiError.badRequest(`Validatsiya xatosi: ${messages.join(', ')}`);
  }

  // JWT xatoliklari
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
