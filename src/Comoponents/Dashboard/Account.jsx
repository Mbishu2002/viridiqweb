import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Divider,
  Container,
  IconButton
} from '@mui/material';
import { Icon } from '@iconify/react';
import logo from '../../Assets/axa.png';

const Account = () => {
  const [formData, setFormData] = useState({
    name: 'Insurance Company Ltd',
    email: 'contact@insurancecompany.com',
    phone: '+1 234 567 890',
    address: '123 Insurance St, Suite 100, City, Country'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Logic to save changes goes here
    console.log('Account details saved:', formData);
    setIsEditing(false);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto', marginRight: '16px' }} />
        <Typography variant="h4">Account Management</Typography>
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, textAlign: 'right' }}>
            {!isEditing ? (
              <IconButton
                color="primary"
                onClick={handleEdit}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon icon="mdi:pen" width={24} height={24} />
                <Typography variant="button" sx={{ ml: 1 }}>
                  Edit
                </Typography>
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Account;
