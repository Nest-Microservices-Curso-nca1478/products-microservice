import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  HOST: string;
  RETRYATTEMPTS: number;
  RETRYDELAY: number;
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    HOST: joi.string().required(),
    RETRYATTEMPTS: joi.number(),
    RETRYDELAY: joi.number(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  host: envVars.HOST,
  retryAttempts: envVars.RETRYATTEMPTS,
  retryDelay: envVars.RETRYDELAY,
  natsServers: envVars.NATS_SERVERS,
};
