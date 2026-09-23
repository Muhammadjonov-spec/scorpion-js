import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Barcha user yo'nalishlari uchun autentifikatsiya talab qilinadi
router.use(protect);

router.get('/', restrictTo('admin'), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', restrictTo('admin'), userController.deleteUser);

export default router;
