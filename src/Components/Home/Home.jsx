// src/pages/Home.js
import React from 'react';
import Header from '../TopDown/header';
import Hero from './Hero';
import Features from './Features';
import Benefits from './Benefits';
import Footer from '../TopDown/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Home;
