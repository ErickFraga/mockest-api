import { ZodValidationPipe } from 'src/common/pipes/zod-validation-pipe';
import { z } from 'zod';

export const createStuffBodySchema = z.object({
  title: z.string().min(3),
  raw_content: z
    .string()
    .max(1000)
    .refine(
      (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid JSON',
      },
    ),
});

export type CreateStuffBody = z.infer<typeof createStuffBodySchema>;

export const createStuffBodyValidationPipe = new ZodValidationPipe(
  createStuffBodySchema,
);
