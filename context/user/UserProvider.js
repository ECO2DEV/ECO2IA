import { useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

const userInitialState = {
  user: null,
  language: 'spanish',
  setUser: () => {},
  setLanguage: () => {},
  // ui matchat stuff
  openHelpers: false,
  setOpenHelpers: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  selectedModel: 'gpt-3.5-turbo',
  setSelectedModel: () => {}
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const setUser = (user) => {
    dispatch({
      type: 'SET_USER',
      payload: user
    });
  };

  const setLanguage = (language) => {
    dispatch({
      type: 'SET_LANGUAGE',
      payload: language
    });
  };

  const setOpenHelpers = (openHelpers) => {
    dispatch({
      type: 'SET_OPEN_HELPERS',
      payload: openHelpers
    });
  };

  const setSelectedModel = (selectedModel) => {
    dispatch({
      type: 'SET_SELECTED_MODEL',
      payload: selectedModel
    });
  };

  const setModalOpen = (modalOpen) => {
    dispatch({
      type: 'SET_MODAL_OPEN',
      payload: modalOpen
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setLanguage,
        setOpenHelpers,
        setModalOpen,
        setSelectedModel
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
