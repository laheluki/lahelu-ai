'use server';

import { env } from '@/config/env';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export async function generateTitle(question: string) {
  const prompt = `Generate a concise title (no more than 5 words) that accurately reflects the main theme or topic of the prompt. Emojis can be used to enhance understanding but avoid quotation marks or special formatting. RESPOND ONLY WITH THE TITLE TEXT "${question}"`;

  try {
    const model = new ChatGoogleGenerativeAI({
      apiKey: env.GOOGLE_API_KEY,
      model: 'gemini-1.5-flash',
    });

    const response = await model.invoke(prompt);

    return response.content;
  } catch (error) {
    return error;
  }
}
