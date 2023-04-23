import { useReducer, useEffect, useMemo } from 'react';
import { PromptContext } from './PromptContext';
import { promptReducer } from './promptReducer';
import countTokens from '../../util/helpers/count_tokens';

const promptInitialState = {
  prompt: null,
  response: null,
  promptTokens: 0,
  setPromptTokens: () => {},
  setResponse: () => {},
  setPrompt: () => {}
};

export const PromptProvider = ({ children }) => {
  const [state, dispatch] = useReducer(promptReducer, promptInitialState);
  const countTokensMemo = useMemo(() => countTokens, []);

  const setPrompt = (prompt) => {
    dispatch({
      type: 'SET_PROMPT',
      payload: prompt
    });
  };

  const setResponse = async (response) => {
    dispatch({
      type: 'SET_RESPONSE',
      payload: response
    });
  };

  useEffect(() => {
    if (!state.prompt) return;
    const resptokens = countTokensMemo(state.prompt);
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: resptokens
    });
  }, [state.prompt, countTokensMemo]);

  const setPromptTokens = (promptTokens) => {
    dispatch({
      type: 'SET_PROMPT_TOKENS',
      payload: promptTokens
    });
  };

  return (
    <PromptContext.Provider
      value={{
        ...state,
        setPrompt,
        setResponse,
        setPromptTokens
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};
