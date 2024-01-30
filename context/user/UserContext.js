import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  language: 'french',
  setUser: () => {},
  setLanguage: () => {},
  // ui matchat stuff
  openHelpers: false,
  setOpenHelpers: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  selectedModel: 'gpt-3.5-turbo',
  setSelectedModel: () => {}
});
