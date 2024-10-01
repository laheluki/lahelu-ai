export interface Model {
  value: string;
  label: string;
  vision?: boolean;
}

export interface ModelsType {
  provider: string;
  models: Model[];
}

export const MODELS: ModelsType[] = [
  {
    provider: 'google',
    models: [
      { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', vision: true },
      { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro', vision: true },
      { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
    ],
  },
  {
    provider: 'openai',
    models: [
      { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
      { value: 'gpt-4', label: 'GPT-4' },
      { value: 'gpt-4o', label: 'GPT-4o' },
      { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
      { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
      { value: 'o1-preview', label: 'O1 preview' },
      { value: 'o1-mini', label: 'O1 mini' },
    ],
  },
  {
    provider: 'groq',
    models: [
      { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
      { value: 'llama3-8b-8192', label: 'Meta Llama 3 8B' },
      { value: 'llama3-70b-8192', label: 'Meta Llama 3 70B' },
      { value: 'llava-v1.5-7b-4096-preview', label: 'LLaVA 1.5 7B' },
      { value: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B (Preview)' },
      { value: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70B (Preview)' },
      {
        value: 'llama3-groq-8b-8192-tool-use-preview',
        label: 'Llama 3 Groq 8B Tool Use (Preview)',
      },
      {
        value: 'llama3-groq-70b-8192-tool-use-preview',
        label: 'Llama 3 Groq 70B Tool Use (Preview)',
      },
      { value: 'gemma-7b-it', label: 'Gemma 7B' },
      { value: 'gemma2-9b-it', label: 'Gemma 2 9B' },
    ],
  },
  // {
  //   provider: 'zhipu',
  //   models: [{ value: 'glm-4-plus', label: 'GLM-4-Plus' }],
  // },
];
