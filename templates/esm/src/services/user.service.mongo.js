import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';

export const getAllUsers = async () => {
  return await User.find().select('-password');
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

export const updateUser = async (id, updateData) => {
  delete updateData.password; // Parolni oddiy update orqali o'zgartirmaslik uchun
  const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return { message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' };
};
