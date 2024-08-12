import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../Assets/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  const handleDownloadClick = () => {
    window.location.href = 'https://yourappdownloadlink.com'; // Replace with your actual download link
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="IoT Risk App Logo" />
      </div>
      <nav className="nav">
        <a href="#features">Features</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
        <a href="#blog">Blog</a>
        <button className="btn" onClick={handleGetStartedClick}>Get Started</button>
        <button className="btn" onClick={handleDownloadClick}>Download App</button>
      </nav>
    </header>
  );
};

export default Header;
