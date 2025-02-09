import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'chat-model-small';

export const myProvider = customProvider({
  languageModels: {
    'chat-model-small': fireworks('accounts/fireworks/models/llama-v3p1-8b-instruct'),
    'chat-model-large': fireworks('accounts/fireworks/models/qwen2p5-72b-instruct'),
    'chat-model-reasoning': wrapLanguageModel({
      model: fireworks('accounts/fireworks/models/qwen-qwq-32b-preview'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
    'title-model': fireworks('accounts/fireworks/models/llama-v3p2-3b-instruct'),
    'block-model': fireworks('accounts/fireworks/models/llama-v3p1-8b-instruct'),
  },
  imageModels: {
    'small-model': fireworks.image('accounts/fireworks/models/stable-diffusion-xl-1024-v1-0'),
    'large-model': fireworks.image('accounts/stability/models/sd3-medium'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model-small',
    name: 'Small model',
    description: 'Small model for fast, lightweight tasks',
  },
  {
    id: 'chat-model-large',
    name: 'Large model',
    description: 'Large model for complex, multi-step tasks',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: 'Uses advanced reasoning',
  },
];
