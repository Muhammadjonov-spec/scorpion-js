import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('[Prisma] Database connected successfully.');
  } catch (error) {
    console.error(`[Prisma] Database connection error: ${error.message}`);
    process.exit(1);
  }
};
