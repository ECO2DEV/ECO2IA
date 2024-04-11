export const storeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SESSION_STABLISHED':
      return {
        ...state,
        sessionStablished: action.payload
      };
    case 'SET_CONVERSATIONS':
      return {
        ...state,
        conversations: action.payload
      };
    case 'SET_SELECTED_CONVERSATION_ID':
      return {
        ...state,
        selectedConversationId: action.payload
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: action.payload
      };
    case 'ADD_MESSAGES':
      return {
        ...state,
        conversations: action.payload
      };

    default:
      return state;
  }
};
