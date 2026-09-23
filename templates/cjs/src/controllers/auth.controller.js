const authService = require('../services/auth.service');
const { ApiResponse } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return ApiResponse.created(res, result, 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi');
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return ApiResponse.success(res, result, 'Muvaffaqiyatli tizimga kirildi');
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  return ApiResponse.success(res, user, 'Foydalanuvchi ma‘lumotlari');
});

module.exports = { register, login, getMe };
