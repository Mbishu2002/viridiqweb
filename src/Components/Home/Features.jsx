// src/components/Features.js
import React from 'react';
import './Features.css';

const features = [
  {
    title: 'Real-Time Data Tracking',
    description: 'Monitor user data in real-time for precise assessments.',
  },
  {
    title: 'Advanced Analytics',
    description: 'Leverage advanced analytics to predict and manage risks.',
  },
  {
    title: 'Secure Data Management',
    description: 'Ensure user data is protected with top-tier security.',
  },
  {
    title: 'Integration with Insurance Systems',
    description: 'Seamlessly integrate with existing insurance systems for streamlined operations.',
  },
];

const Features = () => {
  return (
    <section className="features">
      <h2>Key Features</h2>
      <div className="features-list">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
