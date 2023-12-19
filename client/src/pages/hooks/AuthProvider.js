import React from 'react';
import useAuth from './useAuth';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
