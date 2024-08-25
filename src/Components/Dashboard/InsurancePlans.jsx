import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon as IconifyIcon } from '@iconify/react';
import useServiceApi from '../Config/service';

const InsurancePlans = () => {
  const { createInsurancePlan, getPlans } = useServiceApi();
  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ plan_name: '', description: '', price: '' });
  const [insurancePlans, setInsurancePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const plans = await getPlans();
      if (Array.isArray(plans)) {
        setInsurancePlans(plans);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      setError('Failed to fetch insurance plans.');
    } finally {
      setLoading(false);
    }
  }, [getPlans]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreatePlan = async (e) => {
    e.preventDefault(); 
    setCreating(true);
    try {
      const createdPlan = await createInsurancePlan(newPlan);
      if (createdPlan) {
        setInsurancePlans((prevPlans) => [...prevPlans, createdPlan]);
        setNewPlan({ plan_name: '', description: '', price: '' });
        handleCloseModal();
      } else {
        throw new Error('Failed to create plan');
      }
    } catch (err) {
      setError('Failed to create new plan.');
    } finally {
      setCreating(false);
    }
  };

  const handlePlanClick = (id) => {
    navigate(`/dashboard/plan/${id}`);
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Insurance Plans
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mb: 3 }}
      >
        Create New Plan
      </Button>

      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mb: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && insurancePlans.length === 0 ? (
        <Typography variant="body1" sx={{ mb: 3 }}>
          No plans yet. Create a plan to get started.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {insurancePlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  backgroundColor: 'background.default',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => handlePlanClick(plan.id)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconifyIcon icon="ph:briefcase-light" style={{ color: 'primary.main', fontSize: '2rem' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {plan.plan_name || 'Unnamed Plan'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {truncateDescription(plan.description || 'No description available.', 100)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Price: £{plan.price || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {plan.subscribers || 0} Subscribers
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, width: '80%', maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Create New Insurance Plan
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Plan Name"
            value={newPlan.plan_name}
            onChange={(e) => setNewPlan({ ...newPlan, plan_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            multiline
            rows={4}
            value={newPlan.description}
            onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Price per Month"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePlan}
              disabled={creating}
            >
              {creating ? 'Creating...' : 'Create'}
            </Button>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default InsurancePlans;
