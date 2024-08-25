import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const CustomButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: 'green',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
});

const ForgotPassword = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#ffffff',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
            try {
              const response = await axios.post('/api/forgot-password', { email: values.email });
              if (response.status === 200) {
                setSnackbarMessage('Password reset email sent. Please check your inbox.');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                resetForm();
              }
            } catch (error) {
              if (error.response && error.response.data) {
                setErrors({ email: error.response.data.error });
                setSnackbarMessage(error.response.data.error);
                setSnackbarSeverity('error');
              } else {
                setSnackbarMessage('An unexpected error occurred');
                setSnackbarSeverity('error');
              }
              setSnackbarOpen(true);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <Box sx={{ marginBottom: '20px' }}>
                <Field
                  as={TextField}
                  type="email"
                  name="email"
                  variant="filled"
                  fullWidth
                  label="Email"
                  placeholder="Enter your email"
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Box>
              <CustomButton type="submit" variant="contained" fullWidth disabled={isSubmitting}>
                Submit
              </CustomButton>
            </Form>
          )}
        </Formik>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
