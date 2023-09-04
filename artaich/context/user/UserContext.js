import { createContext } from 'react';

export const UserContext = createContext({
  user: null,
  language: 'french',
  setUser: () => {},
  setLanguage: () => {}
});
