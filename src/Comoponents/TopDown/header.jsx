import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/system';
import { Icon } from '@iconify/react';
import logo from '../../Assets/logo.png';

const CustomButton = styled(Button)({
  marginLeft: '10px',
  backgroundColor: '#25D366', // WhatsApp green
  borderRadius: '25px',
  color: 'white',
  '&:hover': {
    backgroundColor: '#128C7E', // Darker green for hover
  },
});

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  const handleDownloadClick = () => {
    window.location.href = 'https://yourappdownloadlink.com'; // Replace with your actual download link
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary={<a href="#features" style={{ textDecoration: 'none', color: 'black' }}>Features</a>} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={<a href="#about" style={{ textDecoration: 'none', color: 'black' }}>About Us</a>} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={<a href="#contact" style={{ textDecoration: 'none', color: 'black' }}>Contact</a>} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={<a href="#blog" style={{ textDecoration: 'none', color: 'black' }}>Blog</a>} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box display="flex" alignItems="center">
              <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="menu" 
                onClick={toggleDrawer(true)} 
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <Icon icon="mdi:menu" style={{color: "black", fontSize: "24px"}} />
              </IconButton>
              <img src={logo} alt="IoT Risk App Logo" style={{ width: '150px', height: '75px' }} />
            </Box>
            <Box display={{ xs: 'none', md: 'flex' }} alignItems="center">
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                <a href="#features" style={{ textDecoration: 'none', color: 'black' }}>Features</a>
              </Typography>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                <a href="#about" style={{ textDecoration: 'none', color: 'black' }}>About Us</a>
              </Typography>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                <a href="#contact" style={{ textDecoration: 'none', color: 'black' }}>Contact</a>
              </Typography>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                <a href="#blog" style={{ textDecoration: 'none', color: 'black' }}>Blog</a>
              </Typography>
              <CustomButton onClick={handleGetStartedClick}>Get Started</CustomButton>
              <CustomButton onClick={handleDownloadClick}>Download App</CustomButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerItems}
      </Drawer>
    </>
  );
};

export default Header;