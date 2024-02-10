import { createContext } from 'react';

export const PromptContext = createContext({
  plan: [],
  activeAI: 'ChatGpt' || 'DalleIA' || 'Eco2DescriptionAI',
  prompt: 'una mariposa malvada, sangre, roja',
  response: null,
  promptTokens: 0,
  responseTokens: 0,
  setResponseTokens: () => {},
  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {},
  setPlan: () => {},
  setActiveAI: () => {},
  updatePlanTokens: () => {}
});
