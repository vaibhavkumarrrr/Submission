import React from 'react';
import GridContainer from '../componenets/GridContainer';

const Landing: React.FC = () => {
  return (
    <>
      <GridContainer>
        <div className="col-12 col-lg-12 col-sm-12">
          <section className="hero card">
            <h1>Welcome to FinAesthetics</h1>
            <p>Secure, role-based access with a responsive, elegant UI.</p>            
          </section>
        </div>

        <div className="col-6 col-lg-12 col-sm-12">
          <div className="card">
            <h3>Accounts</h3>
            <p style={{ color: '#94a3b8' }}>View your accounts and insights.</p>
          </div>
        </div>
        <div className="col-6 col-lg-12 col-sm-12">
          <div className="card">
            <h3>Banks</h3>
            <p style={{ color: '#94a3b8' }}>Browse linked banks and services.</p>
          </div>
        </div>
      </GridContainer>
    </>
  );
};

export default Landing;
