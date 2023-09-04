import { useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

const userInitialState = {
  user: null,
  language: 'french',
  setUser: () => {},
  setLanguage: () => {}
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

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser,
        setLanguage
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
