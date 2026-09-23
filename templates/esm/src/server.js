import app from './app.js';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';

let server;

const startServer = async () => {
  try {
    // Ma'lumotlar bazasiga ulanish
    await connectDB();

    server = app.listen(config.port, () => {
      console.log(`=================================================`);
      console.log(`Server: http://localhost:${config.port}`);
      console.log(`Environment: ${config.env}`);
      console.log(`Health check: http://localhost:${config.port}/api/v1/health`);
      console.log(`=================================================`);
    });
  } catch (error) {
    console.error('Serverni ishga tushirishda xatolik:', error);
    process.exit(1);
  }
};

// Kutilmagan asinxron xatoliklarni ushlab qolish (Unhandled Rejection)
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Server to‘xtatilmoqda...', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Sinxron xatoliklarni ushlab qolish (Uncaught Exception)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Server to‘xtatilmoqda...', err);
  process.exit(1);
});

// To'xtatish signallarini to'g'ri qabul qilish (Graceful shutdown)
process.on('SIGTERM', () => {
  console.log('SIGTERM qabul qilindi. Server toza yopilmoqda...');
  if (server) {
    server.close(() => console.log('Jarayon to‘xtatildi.'));
  }
});

startServer();
