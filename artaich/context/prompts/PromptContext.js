import { createContext } from 'react';

export const PromptContext = createContext({
  plan: [],
  prompt: null,
  response: null,
  promptTokens: 0,
  responseTokens: 0,
  setResponseTokens: () => {},
  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {},
  setPlan: () => {},
  updatePlanTokens: () => {}
});
