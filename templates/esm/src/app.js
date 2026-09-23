import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from './config/env.js';
import routes from './routes/index.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Xavfsizlik HTTP sarlavhalari
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));

// Statik fayllar (logo, html va rasmlar)
app.use(express.static(path.join(__dirname, '../public')));

// CORS ruxsatnomalari
app.use(cors({ origin: config.cors.origin, credentials: true }));

// DDOS va spamdan himoya qiluvchi Rate Limiting (15 daqiqada 100 ta so'rov)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Juda ko‘p so‘rov yuborildi. Iltimos, keyinroq qayta urinib ko‘ring.',
  },
});
app.use('/api', limiter);

// Morgan orqali so'rovlar logi
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Asosiy API yo'nalishlari
app.use('/api', routes);


// Logo rasmini uzatish (Fallback)
app.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/logo.png'));
});

// Bosh sahifa
app.get('/', (req, res) => {
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({
      name: 'Scorpion.js',
      status: 'online',
      message: 'Express REST API muvaffaqiyatli ishlamoqda',
      docs: '/api/health',
    });
  }

  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Topilmagan yo'nalishlar uchun 404 handler
app.use(notFoundHandler);

// Global xatolar boshqaruvi
app.use(errorHandler);

export default app;
