import { useState, useEffect } from 'react';
import * as jwtDecode from 'jwt-decode';


const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(0);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(!!token);
    if (token) {
      const decoded = jwtDecode.jwtDecode(token);
      setDecodedToken(decoded);
      setIsAdmin(decoded.isAdmin ? 1 : 0);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLogged(true);
    const decoded = jwtDecode.jwtDecode(token);
    setDecodedToken(decoded);
    setIsAdmin(decoded.isAdmin ? 1 : 0);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setIsAdmin(0);
    setDecodedToken(null);
  };

  return { isLogged, isAdmin, decodedToken, login, logout };
};

export default useAuth;
