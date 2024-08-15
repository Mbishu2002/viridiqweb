import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Icon } from '@iconify/react';

const FooterLink = ({ href, children, ...props }) => (
  <Link
    href={href}
    color="inherit"
    underline="none"
    {...props}
    sx={{ '&:hover': { textDecoration: 'underline' } }}
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#333', color: 'white', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Box>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
            </Box>
            <Box>
              <FooterLink href="#terms">Terms of Service</FooterLink>
            </Box>
            <Box>
              <FooterLink href="#help">Help</FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Box>
              <FooterLink href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon icon="mdi:facebook" style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} /> Facebook
              </FooterLink>
            </Box>
            <Box>
              <FooterLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Icon icon="mdi:twitter" style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} /> Twitter
              </FooterLink>
            </Box>
            <Box>
              <FooterLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon icon="mdi:linkedin" style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} /> LinkedIn
              </FooterLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Box display="flex" alignItems="center">
              <Icon icon="mdi:email" style={{ fontSize: '24px', marginRight: '10px', color: 'white' }} />
              <Typography variant="body1">
                peacekarla1@gmail.com
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Viridiq. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
