import React from 'react';
import AppRouter from './AppRouter';
import { AuthProvider } from './Components/context/AuthContext';
import {BrowserRouter as Router} from 'react-router-dom';

const App = () => (
  <Router>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </Router>
);

export default App;