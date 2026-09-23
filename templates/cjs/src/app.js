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
app.use('/api', routes);

// Bosh sahifa (Brauzerda Scorpion ko'rinishi)
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      name: 'Scorpion JS',
      status: 'online',
      message: 'Express REST API muvaffaqiyatli ishlamoqda (CommonJS)',
      docs: '/api/v1/health',
    });
  }

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scorpion JS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #090d16;
      color: #e2e8f0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .card {
      background: #111827;
      border: 1px solid #1f2937;
      border-radius: 20px;
      padding: 44px 36px;
      max-width: 440px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
    }
    .scorpion-logo {
      font-size: 80px;
      line-height: 1;
      margin-bottom: 16px;
      display: inline-block;
      filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.45));
      animation: float 3s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 1px;
      color: #f8fafc;
      margin-bottom: 6px;
    }
    p {
      color: #94a3b8;
      font-size: 14px;
      margin-bottom: 22px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 26px;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10b981;
    }
    .btn {
      display: block;
      padding: 12px;
      border-radius: 10px;
      background: #1f2937;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      border: 1px solid #374151;
    }
    .btn:hover {
      background: #374151;
      color: #ffffff;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="scorpion-logo">🦂</div>
    <h1>SCORPION JS</h1>
    <p>Express.js REST API muvaffaqiyatli ishlamoqda (CommonJS)</p>
    <div class="badge">
      <span class="dot"></span> Server Online
    </div>
    <a class="btn" href="/api/v1/health">API Health Check</a>
  </div>
</body>
</html>`);
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
