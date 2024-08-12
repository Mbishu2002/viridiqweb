import React from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import InsurancePlans from './InsurancePlans';
import Clients from './Clients';
import ClaimsRequests from './ClaimsRequests';
import Account from './Account';
import PlanDetail from './PlanDetails';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          p: 3,
          height: '100vh',
          overflowY: 'auto', 
        }}
      >
        <Container>
          <Routes>
            <Route path="plans" element={<InsurancePlans />} />
            <Route path="clients" element={<Clients />} />
            <Route path="claims" element={<ClaimsRequests />} />
            <Route path="account" element={<Account />} />
            <Route path="plan/:id" element={<PlanDetail />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
