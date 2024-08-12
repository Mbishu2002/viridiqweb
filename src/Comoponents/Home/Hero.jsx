import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  const handleDownloadClick = () => {
    window.location.href = 'https://yourappdownloadlink.com';
  };

  return (
    <section className="hero">
      <h1>Revolutionizing Risk Assessment with Real-Time IoT Data</h1>
      <p>Track user data seamlessly and empower insurance companies with actionable insights.</p>
      <button className="btn-hero" onClick={handleGetStartedClick}>Get Started</button>
      <button className="btn-hero" onClick={handleDownloadClick}>Download App</button>
    </section>
  );
};

export default Hero;
