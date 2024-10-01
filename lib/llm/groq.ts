import { chain } from './langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import { Groq } from '@/config/model';

export const groq = async (
  modelName: string,
  temperature: number,
  message: string,
  chat_history?: [{ question: string; answer: string }]
) => {
  const messages = () => {
    if (chat_history) {
      return chat_history.map((message) => [
        new HumanMessage({ content: message.question }),
        new AIMessage({ content: message.answer }),
      ]);
    }
    return [];
  };

  try {
    const response = await chain(Groq({ modelName, temperature })).invoke({
      chat_history: messages().flat(),
      input: message,
    });

    return response;
  } catch (error) {
    return error;
  }
};
