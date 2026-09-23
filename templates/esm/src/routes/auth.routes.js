import { Router } from 'express';
import Joi from 'joi';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();

const registerSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Ism kiritilishi shart',
      'string.min': 'Ism kamida 2 ta harfdan iborat bo‘lishi kerak',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email kiritilishi shart',
      'string.email': 'To‘g‘ri email manzil kiriting',
    }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'Parol kiritilishi shart',
      'string.min': 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak',
    }),
    role: Joi.string().valid('user', 'admin').default('user'),
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email kiritilishi shart',
      'string.email': 'To‘g‘ri email manzil kiriting',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Parol kiritilishi shart',
    }),
  }),
};

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);

export default router;
