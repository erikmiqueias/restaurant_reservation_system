import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().transform((port) => Number(port)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
