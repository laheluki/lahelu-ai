import { env } from '@/config/env';
import { ChatOpenAI } from '@langchain/openai';
// import { chain } from './langchain';

const createOpenAIClient = (temperature: number, model: string) => {
  const OPENAI = new ChatOpenAI({
    model,
    temperature,
    configuration: {
      apiKey: env.OPENAI_API_KEY,
      baseURL: env.OPENAI_BASE_URL,
    },
  });

  const OPENAI_2 = new ChatOpenAI({
    model,
    temperature,
    configuration: {
      apiKey: env.OPENAI_API_KEY_2,
      baseURL: env.OPENAI_BASE_URL_2,
    },
  });

  const OPENAI_3 = new ChatOpenAI({
    model,
    temperature,
    configuration: {
      apiKey: env.OPENAI_API_KEY_3,
      baseURL: env.OPENAI_BASE_URL_3,
    },
  });

  return OPENAI.withFallbacks([OPENAI_2, OPENAI_3]);
};

export const openai = async (
  modelName: string,
  temperature: number,
  message: string
) => {
  try {
    const resp = await createOpenAIClient(temperature, modelName).invoke(
      message
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};
