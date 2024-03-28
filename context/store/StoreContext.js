import { createContext } from 'react';

export const StoreContext = createContext({
  content: '',
  sessionStablished: false,
  conversations: [],
  selectedConversationId: null,
  setContent: () => {},
  setSelectedConversarionId: () => {},
  // setConversation in the video is call as addMessage !!important
  setConversations: () => {},
  setSessionStablished: () => {},
  // addMessages in the video is call as setConversation !!important they are the all the way around
  addMessages: () => {}
});
