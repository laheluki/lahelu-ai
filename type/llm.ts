export type llmId = CowLlmId | GoogleLlmId;

export type CowLlmId =
  | 'gpt-3.5-turbo'
  | 'gpt-3.5-turbo-0125'
  | 'gpt-3.5-turbo-1106'
  | 'gpt-3.5-turbo-16k'
  | 'gpt-4'
  | 'gpt-4-turbo'
  | 'gpt-4-0125-preview'
  | 'gpt-4-0613'
  | 'gpt-4-1106-preview'
  | 'gpt-4-turbo-2024-04-09'
  | 'gpt-4-turbo-preview'
  | 'gpt-4o'
  | 'chatgpt-4o-latest'
  | 'gpt-4o-2024-05-13'
  | 'gpt-4o-2024-08-06'
  | 'gpt-4o-mini'
  | 'gpt-4o-mini-2024-07-18';

export type GoogleLlmId =
  | 'gemini-1.5-flash'
  | 'gemini-1.5-pro'
  | 'gemini-1.0-pro'
  | 'aqa';
