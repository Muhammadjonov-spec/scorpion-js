const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('[Prisma] Database connected successfully.');
  } catch (error) {
    console.error(`[Prisma] Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
