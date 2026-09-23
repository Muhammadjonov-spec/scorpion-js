const bcrypt = require('bcryptjs');
const { prisma } = require('../config/db');
const { ApiError } = require('../utils/apiError');
const { generateToken } = require('../utils/jwt');

const register = async ({ name, email, password, role = 'user' }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw ApiError.badRequest('Ushbu email bilan foydalanuvchi allaqachon mavjud');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  const token = generateToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw ApiError.unauthorized('Email yoki parol noto‘g‘ri');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized('Email yoki parol noto‘g‘ri');
  }

  const token = generateToken({ id: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId, 10) },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};

module.exports = { register, login, getMe };
