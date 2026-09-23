import * as userService from '../services/user.service.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllUsers();
  return ApiResponse.success(res, users, 'Barcha foydalanuvchilar ro‘yxati');
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  return ApiResponse.success(res, user, 'Foydalanuvchi ma‘lumoti');
});

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  return ApiResponse.success(res, updatedUser, 'Foydalanuvchi ma‘lumotlari yangilandi');
});

export const deleteUser = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  return ApiResponse.success(res, result, 'Foydalanuvchi o‘chirildi');
});
