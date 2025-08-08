// src/lib/scalar.ts
import type { FastifyReply, FastifyRequest } from 'fastify';
import { env } from '../env/env.js';
import { AllTexts } from '../constants/allTexts.ts';
import type { FastifyTypedInstance } from './zod.ts';

export async function ScalarPlugin(app: FastifyTypedInstance) {
  await app.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/docs',
    logLevel: env.LOG_LEVEL,
    configuration: {
      url: '/openapi.json',
      theme: 'purple',
      darkMode: true,
    },
    hooks: {
      onRequest: function (
        request: FastifyRequest,
        reply: FastifyReply,
        done: () => void,
      ) {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Basic ')) {
          reply
            .header('WWW-Authenticate', 'Basic realm="Docs"')
            .status(401)
            .send({ error: AllTexts.scalar.error.missing_token });
          return;
        }

        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString(
          'utf-8',
        );
        const [username, password] = credentials.split(':');

        if (
          username !== env.SWAGGER_USERNAME ||
          password !== env.SWAGGER_PASSWORD
        ) {
          reply
            .header('WWW-Authenticate', 'Basic realm="Docs"')
            .status(401)
            .send({ error: AllTexts.scalar.error.invalid_credentials });
          return;
        }

        done();
      },
      preHandler: function (
        _request: FastifyRequest,
        _reply: FastifyReply,
        done: () => void,
      ) {
        done();
      },
    },
  });
}
