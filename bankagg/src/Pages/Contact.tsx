import React from 'react';
import GridContainer from '../componenets/GridContainer';

const Contact: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card">
        <h2>Contact</h2>
        <p style={{ color: '#94a3b8' }}>
          Reach us at support@example.com
        </p>
      </div>
    </div>
  </GridContainer>
);

export default Contact;
