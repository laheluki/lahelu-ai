import { z } from 'zod';

export const imageSchema = z.object({
  createdAt: z.number().optional(),
  data: z.instanceof(ArrayBuffer),
  fileType: z.string(),
  name: z.string(),
  size: z.number(),
});

export type imageSchemaType = z.infer<typeof imageSchema>;
