import { createContext } from 'react';

export const StoreContext = createContext({
  sidebarChatOpen: false,
  setSidebarChatOpen: () => {},
  selectedConversationId: null,
  setSelectedConversarionId: () => {},
  setConversations: () => {}
});
