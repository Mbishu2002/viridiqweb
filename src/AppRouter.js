// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Comoponents/Home/Home';
// import PrivacyPolicy from './Comoponents/PolicyAndTerms/
// import TermsOfService from './Components/TermsOfService';
import Login from './Comoponents/Auth/login';
import Signup from './Comoponents/Auth/signup'; 
import ForgotPassword from './Comoponents/Auth/Forgot_password';
import Dashboard from './Comoponents/Dashboard/Dashboard';
import {AuthProvider} from './Comoponents/context/AuthContex';

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        {/* <Route path="/terms-of-service" element={<TermsOfService />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
