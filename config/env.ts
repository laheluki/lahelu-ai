import z from 'zod';

const envSchema = z.object({
  // SETTINGS GOOGLE GEMINI
  GOOGLE_API_KEY: z.string().min(1).default(''),

  // SETTINGS OPENAI
  OPENAI_BASE_URL: z.string().min(1).default(''),
  OPENAI_API_KEY: z.string().min(1).default(''),

  // SETTINGS GROQ
  GROQ_API_KEY: z.string().min(1).default(''),
  GROQ_BASE_URL: z.string().min(1).default(''),

  // SETTINGS ZHIPU
  ZHIPU_API_KEY: z.string().min(1).default(''),
  ZHIPU_BASE_URL: z.string().min(1).default(''),
});

export const env = envSchema.parse(process.env);
