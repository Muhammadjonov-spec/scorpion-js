const { prisma } = require('../config/db');
const { ApiError } = require('../utils/apiError');

const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

const updateUser = async (id, updateData) => {
  delete updateData.password;
  const user = await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, updatedAt: true },
  });
  return user;
};

const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id: parseInt(id, 10) },
  });
  return { message: 'Foydalanuvchi muvaffaqiyatli o‘chirildi' };
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
