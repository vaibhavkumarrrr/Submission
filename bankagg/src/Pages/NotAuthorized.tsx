import React from 'react';
import GridContainer from '../componenets/GridContainer';

const NotAuthorized: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card" style={{ borderColor: '#7f1d1d' }}>
        <h2>You are not authorized</h2>
        <p style={{ color: '#94a3b8' }}>
          Please contact your administrator if you believe this is a mistake.
        </p>
      </div>
    </div>
  </GridContainer>
);

export default NotAuthorized;
