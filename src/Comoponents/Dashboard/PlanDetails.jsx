import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const insurancePlans = [
  { id: 1, name: 'Health Insurance Plan A', description: 'Comprehensive health coverage', price: '$100', subscribers: ['John Doe', 'Jane Smith'] },
  { id: 2, name: 'Vehicle Insurance Plan B', description: 'Coverage for vehicle accidents', price: '$75', subscribers: ['Mike Johnson', 'Emily Davis'] },
  { id: 3, name: 'Medical Expenses Plan C', description: 'Covering medical expenses', price: '$90', subscribers: ['Anna Brown', 'Chris Lee'] },
  // Add more plans as needed
];

const PlanDetail = () => {
  const { id } = useParams();
  const plan = insurancePlans.find(plan => plan.id === parseInt(id));

  if (!plan) return <Typography variant="h6">Plan not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {plan.name}
      </Typography>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="h6">{plan.name}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {plan.description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Price: {plan.price}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {plan.subscribers.length} Subscribers
        </Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {plan.subscribers.map((subscriber, index) => (
            <ListItem key={index}>
              <ListItemText primary={subscriber} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PlanDetail;
