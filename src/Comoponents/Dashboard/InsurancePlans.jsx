import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon as IconifyIcon } from '@iconify/react';

const insurancePlans = [
  { id: 1, name: 'Health Insurance Plan A', description: 'Comprehensive health coverage', price: '$100', subscribers: ['John Doe', 'Jane Smith'] },
  { id: 2, name: 'Vehicle Insurance Plan B', description: 'Coverage for vehicle accidents', price: '$75', subscribers: ['Mike Johnson', 'Emily Davis'] },
  { id: 3, name: 'Medical Expenses Plan C', description: 'Covering medical expenses', price: '$90', subscribers: ['Anna Brown', 'Chris Lee'] },
  // Add more plans as needed
];

const InsurancePlans = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: '', description: '', price: '' });
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleCreatePlan = () => {
    // Add logic to create a new plan
    console.log(`Creating new plan: ${JSON.stringify(newPlan)}`);
    // Clear form and close modal
    setNewPlan({ name: '', description: '', price: '' });
    setOpenModal(false);
  };

  const handlePlanClick = (id) => {
    navigate(`/dashboard/plan/${id}`);
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

      <Grid container spacing={2}>
        {insurancePlans.map(plan => (
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
                    {plan.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {plan.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Price: {plan.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {plan.subscribers.length} Subscribers
                  </Typography>
                </Box>
              </Box>
              <Collapse in={expanded === plan.id}>
                <Divider sx={{ my: 2 }} />
                <List>
                  {plan.subscribers.map((subscriber, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={subscriber} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <Button
                variant="text"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(expanded === plan.id ? null : plan.id);
                }}
                sx={{ alignSelf: 'flex-start', mt: 2 }}
              >
                {expanded === plan.id ? 'Show Less' : 'Show More'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

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
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
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
            <Button variant="contained" color="primary" onClick={handleCreatePlan}>
              Create
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
