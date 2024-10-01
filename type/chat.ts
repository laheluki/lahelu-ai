import { llmId } from './llm';

export interface ChatSettings {
  model: llmId;
  prompt: string;
  temperature: number;
}
