import { useReducer } from 'react';
import { StoreContext } from './StoreContext';
import { storeReducer } from './storeReducer';
import { useChatSocket } from '../../hooks/useChatSocket';

const storeInitialState = {
  sidebarChatOpen: false,
  setSidebarChatOpen: () => {},
  selectedConversationId: null,
  setSelectedConversarionId: () => {},
  setConversations: () => {}
};

export const StoreProvider = ({ children }) => {
  const { updateChat } = useChatSocket();
  const [state, dispatch] = useReducer(storeReducer, storeInitialState);

  const setConversations = async ({
    aiMessageId,
    userMessageId,
    conversationId
  }) => {
    try {
      const resUpdateChat = await updateChat({
        conveId: conversationId,
        aiMessageId,
        userMessageId
      });
      console.log('resUpdateChat', resUpdateChat);
    } catch (error) {
      console.error('error updating chat', error);
    }
  };

  const setSidebarChatOpen = (isOpen) => {
    dispatch({
      type: 'SET_SIDEBAR_CHAT_OPEN',
      payload: isOpen
    });
  };

  const setSelectedConversarionId = (conversationId) => {
    dispatch({
      type: 'SET_SELECTED_CONVERSATION_ID',
      payload: conversationId
    });
  };

  return (
    <StoreContext.Provider
      value={{
        ...state,
        setSelectedConversarionId,
        setConversations,
        setSidebarChatOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
