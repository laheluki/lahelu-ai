import { BaseLanguageModel } from '@langchain/core/language_models/base';
import { BaseMessage } from '@langchain/core/messages';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import {
  RunnablePassthrough,
  RunnableSequence,
} from '@langchain/core/runnables';

type ChainInput = {
  chat_history: BaseMessage[];
  input: string;
};

export const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a helpful assistant who remembers all details the user shares with you.`,
  ],
  ['placeholder', '{chat_history}'],
  ['human', '{input}'],
]);

const filterMessages = (input: ChainInput) => input.chat_history.slice(-10);

export const chain = (model: BaseLanguageModel) => {
  return RunnableSequence.from<ChainInput>([
    RunnablePassthrough.assign({
      chat_history: filterMessages,
    }),
    prompt,
    model,
  ]);
};
