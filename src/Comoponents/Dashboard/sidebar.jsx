import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import logo from '../../Assets/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Insurance Plans', path: '/dashboard/', icon: 'mdi:file-document' },
    { text: 'Clients', path: '/dashboard/clients', icon: 'mdi:account' },
    { text: 'Claims Requests', path: '/dashboard/claims', icon: 'mdi:home' },
    { text: 'Account', path: '/dashboard/account', icon: 'mdi:cog' },
  ];

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
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img src={logo} alt="Logo" style={{ width: '150px', height: '80px' }} />
      </Box>
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
  );
};

export default Sidebar;
