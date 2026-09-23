const app = require('./app');
const { config } = require('./config/env');
const { connectDB } = require('./config/db');

let server;

const startServer = async () => {
  try {
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

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Server to‘xtatilmoqda...', err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Server to‘xtatilmoqda...', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM qabul qilindi. Server toza yopilmoqda...');
  if (server) {
    server.close(() => console.log('Jarayon to‘xtatildi.'));
  }
});

startServer();
