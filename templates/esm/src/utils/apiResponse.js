export class ApiResponse {
  static success(res, data = null, message = 'Muvaffaqiyatli bajarildi', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      status: 'success',
      statusCode,
      message,
      data,
    });
  }

  static created(res, data = null, message = 'Muvaffaqiyatli yaratildi') {
    return this.success(res, data, message, 201);
  }

  static error(res, message = 'Xatolik yuz berdi', statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      success: false,
      status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
      statusCode,
      message,
      errors,
    });
  }
}
