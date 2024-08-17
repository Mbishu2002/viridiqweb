import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar } from '@mui/material';

// Dummy clients data
const dummyClients = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', riskProfile: 'Low' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive', riskProfile: 'Medium' },
  { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 'Active', riskProfile: 'High' },
  { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', status: 'Active', riskProfile: 'Low' },
];

const ClientDetail = () => {
  const { id } = useParams();
  const client = dummyClients.find(client => client.id === parseInt(id));

  if (!client) {
    return <Typography variant="h6">Client not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client Details
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          {client.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5">{client.name}</Typography>
      </Box>
      <Typography variant="body1"><strong>Email:</strong> {client.email}</Typography>
      <Typography variant="body1"><strong>Status:</strong> {client.status}</Typography>
      <Typography variant="body1"><strong>Risk Profile:</strong> {client.riskProfile}</Typography>
    </Box>
  );
};

export default ClientDetail;
