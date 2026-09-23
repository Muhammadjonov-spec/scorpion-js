const userService = require('../services/user.service');
const { ApiResponse } = require('../utils/apiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  return ApiResponse.success(res, users, 'Barcha foydalanuvchilar ro‘yxati');
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return ApiResponse.success(res, user, 'Foydalanuvchi ma‘lumoti');
});

const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  return ApiResponse.success(res, updatedUser, 'Foydalanuvchi ma‘lumotlari yangilandi');
});

const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  return ApiResponse.success(res, result, 'Foydalanuvchi o‘chirildi');
});

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
