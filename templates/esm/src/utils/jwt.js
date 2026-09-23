import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (payload, expiresIn = config.jwt.expiresIn) => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};
