import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import { AuthContext } from '../context/AuthContext';

const CustomButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: 'green',
  color: 'white',
  '&:hover': {
    backgroundColor: 'darkgreen',
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Invalid email';
    }
    if (password.length < 6) {
      tempErrors.password = 'Password too short';
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await login(email, password ); 
      } catch (error) {
        setErrors(prev => ({ ...prev, general: 'Login failed. Please try again.' }));
      }
    }
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
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="email"
                  name="email"
                  variant="filled"
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Box>
              <Box sx={{ marginBottom: '20px' }}>
                <TextField
                  type="password"
                  name="password"
                  variant="filled"
                  fullWidth
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Box>
              {errors.general && (
                <Typography color="error" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                  {errors.general}
                </Typography>
              )}
              <CustomButton type="submit" variant="contained" fullWidth>
                Login
              </CustomButton>
            </form>
            <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Forgot Password?
              </Link>
            </Typography>
            <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Sign Up
              </Link>
            </Typography>
            <Typography sx={{ textAlign: 'center', marginTop: '20px' }}>
              <Link to="/privacy-policy" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Privacy Policy
              </Link>{' '}
              |{' '}
              <Link to="/terms-of-service" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Terms of Service
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
