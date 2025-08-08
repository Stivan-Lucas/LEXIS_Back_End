// src/env/env.ts
import { z } from 'zod';
import { config as loadEnv } from 'dotenv';

import { AllTexts } from '../constants/allTexts.ts';
import { app } from '../server.ts';
loadEnv();

const envSchema = z.object({
  // DATA BASE
  DATABASE_URL: z.string().describe(AllTexts.env.description.database_url),

  // SERVER
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .describe(AllTexts.env.description.node_env),
  HOST: z.string().describe(AllTexts.env.description.host),
  PORT: z.coerce.number().describe(AllTexts.env.description.port),
  LOG_LEVEL: z
    .enum(['error', 'trace', 'fatal', 'warn', 'info', 'debug', 'silent'])
    .describe(AllTexts.env.description.log_level),

  // SWAGGER
  SWAGGER_USERNAME: z
    .string()
    .describe(AllTexts.env.description.swagger_username),
  SWAGGER_PASSWORD: z
    .string()
    .describe(AllTexts.env.description.swagger_password),

  // JWT
  JWT_SECRET: z.string().describe(AllTexts.env.description.jwt_secret),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  app.log.error(AllTexts.env.error.validation_failed);
  app.log.error(z.treeifyError(parsedEnv.error));
  process.exit(1);
}

export const env = parsedEnv.data;
export type EnvSchema = typeof env;
