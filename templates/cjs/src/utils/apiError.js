class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message = 'Noto‘g‘ri so‘rov yuborildi') {
    return new ApiError(400, message);
  }

  static unauthorized(message = 'Avtorizatsiyadan o‘tilmagan') {
    return new ApiError(401, message);
  }

  static forbidden(message = 'Ruxsat berilmagan') {
    return new ApiError(403, message);
  }

  static notFound(message = 'Ma‘lumot topilmadi') {
    return new ApiError(404, message);
  }

  static internal(message = 'Serverda ichki xatolik yuz berdi') {
    return new ApiError(500, message, false);
  }
}

module.exports = { ApiError };
