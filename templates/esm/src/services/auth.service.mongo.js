import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { generateToken } from '../utils/jwt.js';

export const register = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.badRequest('Ushbu email bilan foydalanuvchi allaqachon mavjud');
  }

  const user = await User.create({ name, email, password, role });
  const token = generateToken({ id: user._id, role: user.role });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.unauthorized('Email yoki parol noto‘g‘ri');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw ApiError.unauthorized('Email yoki parol noto‘g‘ri');
  }

  const token = generateToken({ id: user._id, role: user.role });

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw ApiError.notFound('Foydalanuvchi topilmadi');
  }
  return user;
};
