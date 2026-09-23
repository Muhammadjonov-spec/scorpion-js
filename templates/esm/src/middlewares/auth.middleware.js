import { ApiError } from '../utils/apiError.js';
import { verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    if (!token) {
      return next(ApiError.unauthorized('Tizimga kirish talab qilinadi. Token topilmadi.'));
    }

    const decoded = verifyToken(token);
    req.user = decoded; // { id, role, ... }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Token muddati tugagan. Qaytadan kiring.'));
    }
    return next(ApiError.unauthorized('Yaroqsiz token.'));
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(ApiError.forbidden('Ushbu amalni bajarish uchun sizda yetarli ruxsat yo‘q.'));
    }
    next();
  };
};
