import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().optional().default(3301),
  MONGO_URL: z.string(),
  MONGO_DB: z.string(),
});

export type Env = z.infer<typeof envSchema>;
