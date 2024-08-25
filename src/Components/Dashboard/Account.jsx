import React, { useState, useEffect, useContext } from 'react';
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
import {useAuth } from '../context/AuthContext'; 
import defaultLogo from '../../Assets/axa.png';
import useServiceApi from '../Config/service';

const Account = () => {
  const { user } = useAuth();
  const { updateInsuranceProfile } = useServiceApi();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [logoFile, setLogoFile] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.company_name || '',
        email: user.email || '',
        phone: user.phone_number || '',
        address: user.address || ''
      });
    }
  }, []); 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('logo', file);

      try {
        await updateInsuranceProfile(formDataToSubmit);
        console.log('Logo updated successfully');
      } catch (error) {
        console.error('Failed to update logo:', error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', formData.name);
    formDataToSubmit.append('email', formData.email); // email should not be changed
    formDataToSubmit.append('phone', formData.phone);
    formDataToSubmit.append('address', formData.address);
    
    if (logoFile) {
      formDataToSubmit.append('logo', logoFile);
    }

    try {
      await updateInsuranceProfile(formDataToSubmit);
      console.log('Account details saved successfully');
    } catch (error) {
      console.error('Failed to save account details:', error);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.company_name || '',
      email: user.email || '',
      phone: user.phone_number || '',
      address: user.address || ''
    });
  };



  const logoUrl = logoFile ? URL.createObjectURL(logoFile) : (user?.logo || defaultLogo);

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <img src={logoUrl} alt="Logo" style={{ width: '150px', height: 'auto' }} />
          {!isEditing && (
            <IconButton
              color="primary"
              component="label"
              sx={{ position: 'absolute', bottom: 8, right: 8 }}
            >
              <Icon icon="mdi:camera" width={24} height={24} />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleLogoChange}
              />
            </IconButton>
          )}
        </Box>
        <Typography variant="h4" sx={{ ml: 2 }}>Account Management</Typography>
      </Box>

      <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h6" gutterBottom>
          Company Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Company Name:</strong> {formData.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Phone Number:</strong> {formData.phone}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {isEditing ? (
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Address:</strong> {formData.address}
                </Typography>
              )}
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
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
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
