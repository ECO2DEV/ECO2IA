import { createContext } from 'react';

export const PromptContext = createContext({
  prompt: null,
  response: null,
  promptTokens: 0,

  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {}
});
