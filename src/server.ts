import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';

import { env } from './env/env.ts';
import { AllTexts } from './constants/allTexts.ts';
import { SwaggerPlugin } from './lib/swagger.ts';
import { ScalarPlugin } from './lib/scalar.ts';
import { PrismaPlugin } from './lib/prisma.ts';
import { OpenapiRoute } from './routes/openapi.ts';

export const app = fastify({
  logger: {
    level: env.LOG_LEVEL,
    transport:
      env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(fastifyCors, { origin: '*' });

await SwaggerPlugin(app);
await ScalarPlugin(app);

await app.register(PrismaPlugin);

OpenapiRoute(app);

app.ready();

app.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`${AllTexts.server.documentationOn} ${address}/docs`);
});
