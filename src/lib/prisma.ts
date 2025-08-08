// src/lib/prisma.ts
import { AllTexts } from '../constants/allTexts.ts';
import type { FastifyTypedInstance } from './zod.ts';
import { PrismaClient } from '../generated/prisma/index.js';
import { withAccelerate } from '@prisma/extension-accelerate';

export async function PrismaPlugin(app: FastifyTypedInstance) {
  const prisma = new PrismaClient({
    log:
      app.log.level === 'trace'
        ? ['query', 'info', 'warn', 'error']
        : ['warn', 'error'],
  }).$extends(withAccelerate());

  try {
    await prisma.$connect();
    app.log.info(AllTexts.prisma.log.connected);
  } catch (error) {
    app.log.error(error, AllTexts.prisma.error.connection_failed);
    throw error;
  }

  app.decorate('prisma', prisma);

  app.addHook('onClose', async (app) => {
    try {
      await app.prisma.$disconnect();
      app.log.info(AllTexts.prisma.log.disconnected);
    } catch (error) {
      app.log.error(error, AllTexts.prisma.error.disconnection_failed);
    }
  });

  app.addHook('onReady', async () => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      app.log.info(AllTexts.prisma.log.health_check);
    } catch (error) {
      app.log.error(error, AllTexts.prisma.error.health_check_failed);
      throw new Error(AllTexts.prisma.error.health_check_failed);
    }
  });
}
