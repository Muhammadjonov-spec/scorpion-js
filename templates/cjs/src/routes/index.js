const { Router } = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
