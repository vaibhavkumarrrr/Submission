import React from 'react';
import GridContainer from '../componenets/GridContainer';

const About: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card">
        <h2>About Us</h2>
        <p style={{ color: '#94a3b8' }}>
          We build secure, aesthetic financial experiences.
        </p>
      </div>
    </div>
  </GridContainer>
);

export default About;
