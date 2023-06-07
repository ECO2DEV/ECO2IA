import { useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './userReducer';

const userInitialState = {
  user: null,
  setUser: () => {}
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const setUser = (user) => {
    dispatch({
      type: 'SET_USER',
      payload: user
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
