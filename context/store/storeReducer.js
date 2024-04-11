export const storeReducer = (state, action) => {
  switch (action.type) {
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
    case 'SET_SIDEBAR_CHAT_OPEN':
      return {
        ...state,
        sidebarChatOpen: action.payload
      };

    default:
      return state;
  }
};
