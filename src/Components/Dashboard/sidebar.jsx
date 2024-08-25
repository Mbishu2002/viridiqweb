import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../../Assets/logo.png';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext

  // Menu items with more appropriate icons
  const menuItems = [
    { text: 'Insurance Plans', path: '/dashboard/', icon: 'mdi:file-document-outline' },
    { text: 'Clients', path: '/dashboard/clients', icon: 'mdi:account-group-outline' },
    { text: 'Claims Requests', path: '/dashboard/claims', icon: 'mdi:clipboard-list-outline' },
    { text: 'Account', path: '/dashboard/account', icon: 'mdi:account-cog-outline' },
  ];

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
        bgcolor: '#f5f5f5',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // Full height of the viewport
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img src={logo} alt="Logo" style={{ width: '150px', height: '80px' }} />
        </Box>

        {/* Menu List */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <IconButton edge="start">
                <Icon icon={item.icon} width={24} height={24} />
              </IconButton>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ mt: 'auto', p: 1 }}>
        <ListItem button onClick={handleLogout}>
          <IconButton edge="start">
            <Icon icon="mdi:logout" width={24} height={24} color="red" /> 
          </IconButton>
          <ListItemText primary="Logout" />
        </ListItem>
      </Box>
    </Box>
  );
};

export default Sidebar;
