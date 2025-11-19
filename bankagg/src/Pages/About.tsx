import React from 'react';
import GridContainer from '../componenets/GridContainer';

const About: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card">
        <h2>About Us</h2>
        <p style={{ color: '#94a3b8' }}>
          We build secure, aesthetic financial experiences designed to make money
          management simple, transparent, and intuitive. Our platform focuses on
          combining modern UI/UX design with advanced security technologies to
          ensure every user interaction is seamless and protected.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>Our Mission</h3>
        <p style={{ color: '#94a3b8' }}>
          To empower individuals and businesses with tools that help them make
          smarter financial decisions while ensuring their data remains private
          and secure.
        </p>

        <h3 style={{ marginTop: '1.5rem' }}>What We Offer</h3>
        <ul style={{ color: '#94a3b8', lineHeight: 1.8 }}>
          <li>Modern dashboards for tracking expenses, revenue, and analytics.</li>
          <li>Bank-grade encryption for all financial data.</li>
          <li>Lightning-fast performance built with scalable infrastructure.</li>
          <li>Customizable financial tools for businesses of all sizes.</li>
          <li>24/7 monitoring and automated alerts for unusual activity.</li>
        </ul>

        <h3 style={{ marginTop: '1.5rem' }}>Our Values</h3>
        <ul style={{ color: '#94a3b8', lineHeight: 1.8 }}>
          <li>Transparency</li>
          <li>Security First</li>
          <li>User-Focused Design</li>
          <li>Innovation & Simplicity</li>
        </ul>
      </div>
    </div>
  </GridContainer>
);

export default About;
