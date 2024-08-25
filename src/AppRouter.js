import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Auth/login';
import Signup from './Components/Auth/signup';
import ForgotPassword from './Components/Auth/Forgot_password';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import { useAuth } from './Components/context/AuthContext';

const AppRouter = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Apply ProtectedRoute to the root path */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={Home}
            redirectPath="/dashboard"
          />
        }
      />
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Directly render Dashboard if logged in */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* Redirect any undefined routes */}
      <Route path="*" element={<Navigate to={isLoggedIn() ? "/dashboard" : "/"} />} />
    </Routes>
  );
};

export default AppRouter;
