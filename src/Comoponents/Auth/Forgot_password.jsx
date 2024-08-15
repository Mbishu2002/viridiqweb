import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

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

const ForgotPassword = () => (
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
        onSubmit={values => {
          // Handle forgot password logic here
          console.log(values);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <Box sx={{ marginBottom: '20px' }}>
              <TextField
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
    </Box>
  </Container>
);

export default ForgotPassword;
