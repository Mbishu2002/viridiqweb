import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import config from '@/config/config';
import { useNavigate } from 'react-router-dom';

// Create a context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Function to handle login
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
        // Store token in localStorage
        localStorage.setItem('authToken', data.token);

      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    setUser(null);
    setToken(null);
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    navigate('/login'); // Navigate to login page
  };

  // Retrieve token from localStorage on initial load
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

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
