import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, CircularProgress, Alert, Button, Card, CardContent, Grid } from '@mui/material';
import useServiceApi from '../Config/service';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ClientDetail = () => {
  const { id } = useParams();
  const { viewClientProfile, requestClientData } = useServiceApi();
  
  const [client, setClient] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [riskProfile, setRiskProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [dataRequestStatus, setDataRequestStatus] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const loadClient = useCallback(async () => {
    try {
      const clientData = await viewClientProfile(id);
      setClient(clientData.client_profile);
      setHealthData(clientData.health_data);
      setRiskProfile(clientData.risk_profile);
      setDataRequestStatus(clientData.message);
    } catch (err) {
      setError(`Failed to fetch client details. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [id, viewClientProfile]);

  useEffect(() => {
    loadClient();
  }, [loadClient]);

  const handleRequestClientData = async () => {
    setIsRequesting(true);
    try {
      await requestClientData(id);
      setRequestStatus('Request sent successfully.');
      setDataRequestStatus('Your request is being processed. You will be notified once it is approved.');
      await loadClient(); 
    } catch (err) {
      setError(`Failed to request health data. ${err.message}`);
    } finally {
      setIsRequesting(false);
    }
  };

  const chartData = useMemo(() => {
    const validSteps = (healthData || [])
      .map(entry => JSON.parse(entry.data).steps)
      .filter(step => step !== undefined);

    return {
      labels: (healthData || []).map(item => new Date(item.timestamp).toLocaleDateString()),
      datasets: [
        {
          label: 'Steps',
          data: validSteps, // Use the filtered steps array directly
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
      ]
    };
  }, [healthData]);

  const renderClientInfo = () => (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar 
          sx={{ bgcolor: 'primary.main', width: 80, height: 80, mr: 2, borderRadius: '8px' }}
          src={client?.profile_image || ''}
        >
          {!client?.profile_image && client?.first_name?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5">{client.first_name}</Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 1 }}>
        {client.email}
      </Typography>
    </>
  );

  const renderHealthData = () => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Health Data</Typography>
        <Line data={chartData} options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Health Data Over Time' }
          }
        }} />
      </CardContent>
    </Card>
  );

  const renderRiskProfile = () => {
    const getRiskColor = (riskLevel) => {
      switch (riskLevel) {
        case 'High Risk':
          return 'red';
        case 'Moderate Risk':
          return 'orange';
        case 'Low Risk':
          return 'green';
        default:
          return 'gray';
      }
    };

    const riskColor = riskProfile ? getRiskColor(riskProfile.risk_level) : 'gray';

    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Risk Profile</Typography>
          <Typography variant="body1" sx={{ color: riskColor }}>
             {riskProfile ? riskProfile.risk_level : '---'}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 3 }} />;
  if (error) return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>;
  if (!client) return <Typography variant="h6">Client not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Client Details</Typography>
      {renderClientInfo()}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {healthData ? renderHealthData() : (
            <>
              <Typography variant="h6">Health Data</Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">No health data available.</Typography>
                </CardContent>
              </Card>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleRequestClientData}
                disabled={isRequesting}
              >
                {isRequesting ? 'Requesting...' : 'Request Health Data Access'}
              </Button>
              {dataRequestStatus && <Alert severity="info" sx={{ mt: 2 }}>{dataRequestStatus}</Alert>}
            </>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderRiskProfile()}
        </Grid>
      </Grid>
      {requestStatus && <Alert severity="success" sx={{ mb: 2 }}>{requestStatus}</Alert>}
    </Box>
  );
};

export default ClientDetail;
