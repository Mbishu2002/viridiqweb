import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '../Config/config';
import { useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/login/`, 
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const data = response.data;
      if (response.status === 200) {
        setUser(data.user);
        setToken(data.token);
        console.log(data.user);
        localStorage.setItem('authToken', data.token);
        navigate('/dashboard/');

      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    navigate('/login'); 
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };
    loadToken();
  }, []);

  const isLoggedIn = () => {
    return !!token;
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, token, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
