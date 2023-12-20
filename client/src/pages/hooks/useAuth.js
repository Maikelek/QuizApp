import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(0);
  const [userId, setUserId] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(!!token);
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setIsAdmin(decoded.isAdmin ? 1 : 0);
      setUserId(decoded.userId);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLogged(true);
    const decoded = jwtDecode(token);
    setDecodedToken(decoded);
    setIsAdmin(decoded.isAdmin ? 1 : 0);
    setUserId(decoded.userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
    setIsAdmin(0);
    setUserId(null);
    setDecodedToken(null);
  };

  return { isLogged, isAdmin, userId, decodedToken, login, logout };
};

export default useAuth;
