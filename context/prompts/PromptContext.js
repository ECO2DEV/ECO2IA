import { createContext } from 'react';

export const PromptContext = createContext({
  plan: [],
  activeAI: null,
  prompt: null,
  response: null,
  promptTokens: 0,
  responseTokens: 0,
  iasAllowedToAccess: [],
  setIasAllowedToAccess: () => {},
  setResponseTokens: () => {},
  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {},
  setPlan: () => {},
  setActiveAI: () => {},
  updatePlanTokens: () => {}
});
