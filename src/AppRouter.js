// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Comoponents/Home/Home';
// import PrivacyPolicy from './Comoponents/PolicyAndTerms/
// import TermsOfService from './Components/TermsOfService';
import Login from './Comoponents/Auth/login';
import Signup from './Comoponents/Auth/signup'; 
import ForgotPassword from './Comoponents/Auth/Forgot_password';
import VerifyEmail from './Comoponents/Auth/verify_email'; 
import ResetPassword from './Comoponents/Auth/reset_password'; 
import Dashboard from './Comoponents/Dashboard/Dashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        {/* <Route path="/terms-of-service" element={<TermsOfService />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
