import React from 'react';
import GridContainer from '../componenets/GridContainer';

const NotFound: React.FC = () => (
  <GridContainer>
    <div className="col-12">
      <div className="card">
        <h2>404 - Not Found</h2>
        <p style={{ color: '#94a3b8' }}>The page you are looking for doesn’t exist.</p>
      </div>
    </div>
  </GridContainer>
);

export default NotFound;