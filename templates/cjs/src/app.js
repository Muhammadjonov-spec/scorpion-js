const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const { config } = require('./config/env');
const routes = require('./routes/index');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.cors.origin, credentials: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Juda ko‘p so‘rov yuborildi. Iltimos, keyinroq qayta urinib ko‘ring.',
  },
});
app.use('/api', limiter);

if (config.env !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.json({
    message: 'Express REST API muvaffaqiyatli ishlamoqda (CommonJS) 🚀',
    docs: '/api/v1/health',
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
