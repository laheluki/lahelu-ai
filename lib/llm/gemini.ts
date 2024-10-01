'use server';

import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  maxOutputTokens: 2048,
  cache: true,
  temperature: 0,
});

export const responseGemini = async (text: string, image_url: string) => {
  const prompt = [
    new HumanMessage({
      content: [
        {
          type: 'text',
          text,
        },
        {
          type: 'image_url',
          image_url,
        },
      ],
    }),
  ];

  const res = await model.invoke(prompt);

  return { content: res.content };
};
