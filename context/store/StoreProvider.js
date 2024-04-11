import { useReducer } from 'react';
import { StoreContext } from './StoreContext';
import { storeReducer } from './storeReducer';

const storeInitialState = {
  content: '',
  sessionStablished: false,
  conversations: [],
  selectedConversationId: null,
  setContent: () => {},
  setSelectedConversarionId: () => {},
  setConversations: () => {},
  setSessionStablished: () => {},
  addMessages: () => {}
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, storeInitialState);

  const setMessages = (conversations) => {
    dispatch({
      type: 'ADD_MESSAGES',
      payload: conversations
    });
  };

  const setConversations = ({ message, conversationId }) => {
    const existingConversationIndex = state.conversations.findIndex(
      (conv) => conv.id === conversationId
    );

    let updatedConversations;

    if (existingConversationIndex !== -1) {
      // If conversation exists, update its messages by appending the new message
      updatedConversations = state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return { ...conv, messages: [...conv.messages, message] };
        }
        return conv;
      });
    } else {
      // Create a new conversation if it doesn't exist
      updatedConversations = [
        ...state.conversations,
        { id: conversationId, messages: [message] }
      ];
    }

    dispatch({
      type: 'SET_CONVERSATIONS',
      payload: updatedConversations
    });
    // console.log('state.conversations', state.conversations);
  };

  const setSessionStablished = (sessionStablished) => {
    dispatch({
      type: 'SET_SESSION_STABLISHED',
      payload: sessionStablished
    });
  };

  const setSelectedConversarionId = (conversationId) => {
    dispatch({
      type: 'SET_SELECTED_CONVERSATION_ID',
      payload: conversationId
    });
  };

  const setContent = (content) => {
    dispatch({
      type: 'SET_CONTENT',
      payload: content
    });
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setSelectedConversarionId,
        setConversations,
        setSessionStablished,
        setContent,
        setMessages
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
