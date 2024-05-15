import { createContext } from 'react';

export const StoreContext = createContext({
  dashModalOpen: false,
  setdashModalOpen: () => {},
  selectedConversationId: null,
  setSelectedConversarionId: () => {},
  setConversations: () => {}
});
