// src/routes/openapi.ts
import type { FastifyTypedInstance } from '../lib/zod.ts';

export function OpenapiRoute(app: FastifyTypedInstance) {
  app.get('/openapi.json', { schema: { hide: true } }, async () => {
    return app.swagger();
  });
}
