export const promptReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROMPT':
      return {
        ...state,
        prompt: action.payload
      };
    case 'SET_RESPONSE':
      return {
        ...state,
        response: action.payload
      };
    case 'SET_PROMPT_TOKENS':
      return {
        ...state,
        promptTokens: action.payload
      };
    default:
      return state;
  }
};
