import React from 'react';
import { TextField, Button, Container, Typography, Grid, Box, Link as MuiLink } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';

const SignupSchema = Yup.object().shape({
  companyName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
});

const Signup = () => {
  const formik = useFormik({
    initialValues: { companyName: '', email: '', password: '', confirmPassword: '' },
    validationSchema: SignupSchema,
    onSubmit: values => {
      // Handle signup logic here
      console.log(values);
    },
  });

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
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            sx={{
              padding: '20px',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#ffffff',
            }}
          >
            <Box sx={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src={logo} alt="App Logo" style={{ width: '100px', height: 'auto' }} />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="text"
                  name="companyName"
                  variant="filled"
                  fullWidth
                  label="Company Name"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  error={formik.touched.companyName && !!formik.errors.companyName}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                />
              </Box>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="email"
                  name="email"
                  variant="filled"
                  fullWidth
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Box>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="password"
                  name="password"
                  variant="filled"
                  fullWidth
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Box>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="password"
                  name="confirmPassword"
                  variant="filled"
                  fullWidth
                  label="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: '20px', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign Up
              </Button>
            </form>
            <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
              Already have an account? <MuiLink component={Link} to="/login" underline="hover">Sign In</MuiLink>
            </Typography>
            <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
              <MuiLink component={Link} to="/privacy-policy" underline="hover">Privacy Policy</MuiLink> |{' '}
              <MuiLink component={Link} to="/terms-of-service" underline="hover">Terms of Service</MuiLink>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
