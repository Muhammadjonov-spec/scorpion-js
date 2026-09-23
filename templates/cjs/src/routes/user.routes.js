const { Router } = require('express');
const userController = require('../controllers/user.controller');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

const router = Router();

router.use(protect);

router.get('/', restrictTo('admin'), userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', restrictTo('admin'), userController.deleteUser);

module.exports = router;
