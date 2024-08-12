// src/components/Benefits.js
import React from 'react';
import './Benefits.css';

const benefits = [
  {
    title: 'For Users',
    description: 'Get personalized insights and manage your data effortlessly.',
  },
  {
    title: 'For Insurance Companies',
    description: 'Access comprehensive data for more accurate risk assessment and policy pricing.',
  },
];

const Benefits = () => {
  return (
    <section className="benefits">
      <h2>Benefits</h2>
      <div className="benefits-list">
        {benefits.map((benefit, index) => (
          <div key={index} className="benefit">
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
