// src/lib/swagger.ts
import fastifySwagger from '@fastify/swagger';
import type { FastifyTypedInstance } from './zod.ts';
import { AllTexts } from '../constants/allTexts.ts';

export async function SwaggerPlugin(app: FastifyTypedInstance) {
  try {
    await app.register(fastifySwagger, {
      openapi: {
        info: {
          title: AllTexts.swagger.title,
          description: AllTexts.swagger.description,
          version: AllTexts.swagger.version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: AllTexts.swagger.auth.type,
              scheme: AllTexts.swagger.auth.scheme,
              bearerFormat: AllTexts.swagger.auth.bearerFormat,
              description: AllTexts.swagger.auth.description,
            },
          },
        },
        tags: [
          { name: 'auth', description: AllTexts.swagger.tags.auth },
          { name: 'users', description: AllTexts.swagger.tags.users },
          { name: 'todos', description: AllTexts.swagger.tags.todos },
        ],
      },
    });
  } catch (error) {
    app.log.error(AllTexts.swagger.errors.setup_failed);
    throw error;
  }
}
