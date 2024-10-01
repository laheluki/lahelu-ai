import { ChatGroq } from '@langchain/groq';
import { env } from './env';

interface GroqInterface {
  modelName: string;
  temperature?: number;
}

export const Groq = ({ modelName, temperature = 0.2 }: GroqInterface) => {
  return new ChatGroq({
    apiKey: env.GROQ_API_KEY,
    model: modelName,
    temperature,
    cache: true,
  });
};
