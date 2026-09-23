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
  <title>Scorpion.js - Progressive Express Framework</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0B0E14;
      background-image: 
        radial-gradient(circle at 50% 25%, rgba(225, 29, 72, 0.15) 0%, transparent 60%),
        radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.05) 0%, transparent 40%);
      color: #F1F5F9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px 20px;
    }
    .container {
      max-width: 600px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .logo-wrapper {
      position: relative;
      margin-bottom: 24px;
      animation: float 4s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .scorpion-svg {
      width: 170px;
      height: 170px;
      display: block;
      filter: drop-shadow(0 0 35px rgba(225, 29, 72, 0.4));
    }
    h1 {
      font-size: 34px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 12px;
      background: linear-gradient(135deg, #FFFFFF 30%, #FDA4AF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.tagline {
      color: #94A3B8;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
      max-width: 480px;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34D399;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 28px;
      letter-spacing: 0.3px;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 10px #10B981;
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }
    .code-box {
      background: #111827;
      border: 1px solid #1F2937;
      border-radius: 12px;
      padding: 14px 24px;
      font-family: 'Fira Code', Consolas, Monaco, monospace;
      font-size: 14px;
      color: #E2E8F0;
      margin-bottom: 28px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    .code-box code {
      color: #FB7185;
    }
    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 11px 22px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-primary {
      background: #E11D48;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);
    }
    .btn-primary:hover {
      background: #BE123C;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: #1E293B;
      color: #E2E8F0;
      border: 1px solid #334155;
    }
    .btn-secondary:hover {
      background: #334155;
      color: #FFFFFF;
      transform: translateY(-1px);
    }
    footer {
      margin-top: 40px;
      color: #64748B;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-wrapper">
      <svg viewBox="0 0 400 400" class="scorpion-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="scorpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF3366"/>
            <stop offset="50%" stop-color="#E11D48"/>
            <stop offset="100%" stop-color="#BE123C"/>
          </linearGradient>
          <linearGradient id="scorpAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FDA4AF"/>
            <stop offset="100%" stop-color="#FB7185"/>
          </linearGradient>
        </defs>
        <g fill="url(#scorpGrad)" stroke="#0B0E14" stroke-width="2" stroke-linejoin="round">
          <!-- Stinger & Tail -->
          <path d="M 200,32 C 196,44 191,52 182,58 C 193,56 205,48 208,35 Z" fill="#FFE4E6"/>
          <path d="M 182,58 C 170,68 172,85 186,92 C 198,90 206,78 204,64 C 202,54 191,54 182,58 Z"/>
          <path d="M 186,92 C 182,106 188,122 202,126 C 214,124 220,110 216,98 C 212,88 198,84 186,92 Z"/>
          <path d="M 202,126 C 204,142 216,156 230,154 C 242,148 244,132 236,120 C 228,112 212,116 202,126 Z"/>
          <path d="M 230,154 C 238,172 248,190 252,208 C 260,204 264,188 258,172 C 252,158 240,148 230,154 Z"/>
          <path d="M 252,208 C 250,228 238,248 222,258 C 218,266 230,270 240,260 C 256,246 266,224 264,204 Z"/>
          <path d="M 222,258 C 214,264 204,268 192,268 L 208,268 C 220,268 226,262 232,256 Z"/>

          <!-- Body Carapace -->
          <polygon points="178,258 222,258 218,244 182,244"/>
          <polygon points="175,242 225,242 222,228 178,228"/>
          <polygon points="172,226 228,226 225,212 175,212"/>
          <polygon points="170,210 230,210 228,196 172,196"/>
          <polygon points="172,194 228,194 225,180 175,180"/>
          <polygon points="175,178 225,178 222,164 178,164"/>
          
          <!-- Head / Cephalothorax -->
          <path d="M 180,162 L 220,162 L 228,142 L 216,128 L 200,122 L 184,128 L 172,142 Z"/>
          <polygon points="196,134 204,134 202,142 198,142" fill="#FFE4E6"/>

          <!-- Left Claws -->
          <path d="M 176,144 C 158,136 138,134 120,140 C 116,146 120,154 128,150 C 144,144 162,146 174,152 Z"/>
          <path d="M 120,140 C 108,126 94,108 90,88 C 84,90 86,102 92,114 C 98,128 110,142 122,148 Z"/>
          <path d="M 90,88 C 84,68 70,54 52,50 C 44,58 50,78 64,90 C 74,98 84,98 90,88 Z"/>
          <path d="M 52,50 C 42,34 32,24 16,18 C 18,34 30,52 44,62 C 48,56 50,52 52,50 Z"/>
          <path d="M 52,50 C 58,38 68,26 84,18 C 74,30 68,46 62,60 C 58,56 54,52 52,50 Z" fill="url(#scorpAccent)"/>

          <!-- Right Claws -->
          <path d="M 224,144 C 242,136 262,134 280,140 C 284,146 280,154 272,150 C 256,144 238,146 226,152 Z"/>
          <path d="M 280,140 C 292,126 306,108 310,88 C 316,90 314,102 308,114 C 302,128 290,142 278,148 Z"/>
          <path d="M 310,88 C 316,68 330,54 348,50 C 356,58 350,78 336,90 C 326,98 316,98 310,88 Z"/>
          <path d="M 348,50 C 358,34 368,24 384,18 C 382,34 370,52 356,62 C 352,56 350,52 348,50 Z"/>
          <path d="M 348,50 C 342,38 332,26 316,18 C 326,30 332,46 338,60 C 342,56 346,52 348,50 Z" fill="url(#scorpAccent)"/>

          <!-- Left Legs -->
          <path d="M 175,170 C 150,165 125,170 105,190 L 100,186 C 122,162 150,156 176,164 Z"/>
          <path d="M 174,186 C 145,185 120,195 98,220 L 94,215 C 118,186 145,176 175,178 Z"/>
          <path d="M 172,202 C 142,206 118,222 96,250 L 92,244 C 115,214 140,196 173,194 Z"/>
          <path d="M 170,218 C 145,228 122,250 102,280 L 97,274 C 118,242 142,218 171,210 Z"/>

          <!-- Right Legs -->
          <path d="M 225,170 C 250,165 275,170 295,190 L 300,186 C 278,162 250,156 224,164 Z"/>
          <path d="M 226,186 C 255,185 280,195 302,220 L 306,215 C 282,186 255,176 225,178 Z"/>
          <path d="M 228,202 C 258,206 282,222 304,250 L 308,244 C 285,214 260,196 227,194 Z"/>
          <path d="M 230,218 C 255,228 278,250 298,280 L 303,274 C 282,242 258,218 229,210 Z"/>
        </g>
      </svg>
    </div>
    <h1>SCORPION.JS</h1>
    <p class="tagline">A progressive Express.js framework starter for building efficient, scalable and enterprise-ready backend applications.</p>
    <div class="status-pill">
      <span class="dot"></span> Server is running online
    </div>
    <div class="code-box">
      <span>To get started, edit <code>src/routes/index.js</code></span>
    </div>
    <div class="actions">
      <a class="btn btn-primary" href="/api/v1/health">API Health Check</a>
      <a class="btn btn-secondary" href="https://github.com/Muhammadjonov-spec/scorpion-js" target="_blank">Documentation</a>
    </div>
    <footer>Scorpion.js • MIT Licensed</footer>
  </div>
</body>
</html>`);
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
