import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
  Button,
  Collapse,
  CircularProgress,
} from '@mui/material';
import { Icon } from '@iconify/react';
import useServiceApi from '../Config/service';  

const ClaimsRequests = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [claims, setClaims] = useState([]);

  const { getClaims, updateClaimStatus } = useServiceApi();

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const response = await getClaims();
        setClaims(response.data || response); 
        console.log(response);
      } catch (error) {
        console.error('Error fetching claims:', error);
        setClaims([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleNotificationClick = (id) => {
    setExpandedNotification(id === expandedNotification ? null : id);
  };

  const handleUpdateClaimStatus = async (claimId, status) => {
    setLoading(true);
    try {
      await updateClaimStatus(claimId, { status });
      alert(`Claim ${status}`);
      // Optionally refresh claims after status update
      const updatedClaims = claims.map(claim =>
        claim.id === claimId ? { ...claim, status } : claim
      );
      setClaims(updatedClaims);
    } catch (error) {
      console.error('Error updating claim status:', error);
      alert('Failed to update claim status.');
    } finally {
      setLoading(false);
    }
  };

  const truncatedDescription = (description) => {
    return description.length > 100 ? `${description.substring(0, 100)}...` : description;
  };

  const filteredClaims = (claims || []).filter(claim => {
    const matchesFilter = filter === 'All' || claim.description.includes(filter);
    const matchesSearch = claim.id.toString().includes(search) || claim.description.toLowerCase().includes(search.toLowerCase());
    const matchesTimeFilter = timeFilter === 'All' || (new Date(claim.date_submitted).toLocaleDateString() === timeFilter);
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
            placeholder="Search by Claim ID or Description..."
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
              <MenuItem value="Medical Expenses">Medical Expenses</MenuItem>
              {/* Add other filters as needed */}
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
              <MenuItem value={new Date().toLocaleDateString()}>Today</MenuItem>
              <MenuItem value={new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString()}>Yesterday</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </Box>
        ) : filteredClaims.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Typography variant="h6">No submitted claims</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {filteredClaims.map(claim => (
              <Box
                key={claim.id}
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
                onClick={() => handleNotificationClick(claim.id)}
              >
                <Typography variant="h6">Claim #{claim.id}</Typography> {/* Display claim number as submitted */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: expandedNotification === claim.id ? 'none' : 3,
                  }}
                >
                  {expandedNotification === claim.id ? claim.description : truncatedDescription(claim.description)}
                </Typography>
                <Typography variant="caption" color="textSecondary">{new Date(claim.date_submitted).toLocaleDateString()}</Typography>
                <Collapse in={claim.id === expandedNotification}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Amount Claimed:</strong> {claim.amount_claimed}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleUpdateClaimStatus(claim.id, 'approved')}
                        sx={{ mr: 2 }}
                        disabled={loading}
                      >
                        Approve
                        {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleUpdateClaimStatus(claim.id, 'rejected')}
                        disabled={loading}
                      >
                        Reject
                        {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
                      </Button>
                    </Box>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClaimsRequests;
