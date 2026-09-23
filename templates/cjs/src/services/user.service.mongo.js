const { User } = require('../models/user.model');
const { ApiError } = require('../utils/apiError');

const getAllUsers = async () => {
  return await User.find().select('-password');
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

const updateUser = async (id, updateData) => {
  delete updateData.password;
  const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return { message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' };
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
