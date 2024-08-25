import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Component to protect routes based on authentication
const ProtectedRoute = ({ element: Element, redirectPath, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? <Element /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
