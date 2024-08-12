import React, { useState } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Divider,
  Button,
  Collapse,
  IconButton,
} from '@mui/material';
import { Icon } from '@iconify/react';

const notifications = [
  { 
    id: 1, 
    title: 'Claim Request #123', 
    description: 'Claim for property damage. This description can be very long, and it should be truncated when not expanded to keep the UI clean and readable. More details should be visible upon expanding the card.', 
    date: '2024-08-05', 
    contact: 'contact1@example.com',
    clientName: 'John Doe',
    documents: ['Document1.pdf', 'Document2.pdf']
  },
  { 
    id: 2, 
    title: 'Claim Request #124', 
    description: 'Claim for vehicle accident. The details of the accident are crucial and may be long, so we will truncate the text here and show full details when expanded.', 
    date: '2024-08-06', 
    contact: 'contact2@example.com',
    clientName: 'Jane Smith',
    documents: ['Document3.pdf']
  },
  { 
    id: 3, 
    title: 'Claim Request #125', 
    description: 'Claim for medical expenses. This description also needs to be truncated in the unexpanded view for better readability.', 
    date: '2024-08-07', 
    contact: 'contact3@example.com',
    clientName: 'Alice Johnson',
    documents: ['Document4.pdf', 'Document5.pdf']
  },
  // Add more notifications as needed
];

const ClaimsRequests = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [expandedNotification, setExpandedNotification] = useState(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleNotificationClick = (notification) => {
    setExpandedNotification(notification.id === expandedNotification ? null : notification.id);
  };

  const handleContact = (contact) => {
    const subject = 'Regarding Your Claim Request';
    const body = `Dear Client,\n\nWe are reaching out to you regarding your claim request. Please find the details below:\n\nSubject: ${subject}\n\nThank you.`;
    window.location.href = `mailto:${contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'All' || notification.description.includes(filter);
    const matchesSearch = notification.title.toLowerCase().includes(search.toLowerCase());
    const matchesTimeFilter = timeFilter === 'All' || (new Date(notification.date).toLocaleDateString() === timeFilter);
    return matchesFilter && matchesSearch && matchesTimeFilter;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Claims Requests
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <Icon icon="mdi-light:magnify" style={{ marginRight: 8 }} />,
            }}
          />
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={handleFilterChange}
              label="Filter"
              startAdornment={<Icon icon="mdi-light:filter" style={{ marginRight: 8 }} />}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Property Damage">Property Damage</MenuItem>
              <MenuItem value="Vehicle Accident">Vehicle Accident</MenuItem>
              <MenuItem value="Medical Expenses">Medical Expenses</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel>Time Filter</InputLabel>
            <Select
              value={timeFilter}
              onChange={handleTimeFilterChange}
              label="Time Filter"
              startAdornment={<Icon icon="mdi-light:clock" style={{ marginRight: 8 }} />}
            >
              <MenuItem value="All">All</MenuItem>
              {/* Example time filters */}
              <MenuItem value={new Date().toLocaleDateString()}>Today</MenuItem>
              <MenuItem value={new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString()}>Yesterday</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredNotifications.map(notification => (
            <Box
              key={notification.id}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                cursor: 'pointer',
                backgroundColor: 'background.paper',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
              onClick={() => handleNotificationClick(notification)}
            >
              <Typography variant="h6">{notification.title}</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  WebkitLineClamp: expandedNotification === notification.id ? 'none' : 3,
                }}
              >
                {notification.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">{notification.date}</Typography>
              <Collapse in={notification.id === expandedNotification}>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Client Name:</strong> {notification.clientName}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Documents:</strong> {notification.documents.join(', ')}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleContact(notification.contact)}
                    sx={{ mt: 2 }}
                  >
                    Contact
                  </Button>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimsRequests;
