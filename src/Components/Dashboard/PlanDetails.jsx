import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Avatar
} from '@mui/material';
import useServiceApi from '../Config/service';

const PlanDetail = () => {
  const { id } = useParams();
  const { getPlanByID } = useServiceApi();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPlanDetails = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPlan = await getPlanByID(id);
      setPlan(fetchedPlan);
    } catch (err) {
      setError('Failed to fetch plan details.');
    } finally {
      setLoading(false);
    }
  }, [id, getPlanByID]);

  useEffect(() => {
    getPlanDetails();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!plan) return <Typography variant="h6">Plan not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {plan.name}
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        {plan.plan_name}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {plan.description}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Price: £{plan.price || 'N/A'}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {plan.subscribers.length > 0 
          ? `${plan.subscribers.length} Subscriber${plan.subscribers.length !== 1 ? 's' : ''}`
          : 'No Subscribers'}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <List>
        {plan.subscribers.map((subscriber, index) => (
          <ListItem key={index}>
            <Avatar 
              src={subscriber.client_profile || '/default-profile.png'}
              alt={subscriber.client_name}
              sx={{ mr: 2 }}
            />
            <ListItemText
              primary={subscriber.client_name}
              secondary={`Email: ${subscriber.client_email} | Status: ${subscriber.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PlanDetail;
