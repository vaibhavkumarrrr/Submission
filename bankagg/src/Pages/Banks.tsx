import React from 'react';
import GridContainer from '../componenets/GridContainer';

const Banks: React.FC = () => {
  const banks = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'IDFC'];
  return (
    <GridContainer>
      <div className="col-12">
        <div className="card">
          <h2>Banks</h2>
          <p style={{ color: '#94a3b8' }}>Your connected institutions.</p>
        </div>
      </div>
      {banks.map((b) => (
        <div key={b} className="col-4 col-lg-6 col-sm-12">
          <div className="card">
            <h4>{b} Bank</h4>
            <p style={{ color: '#94a3b8' }}>Status: Connected</p>
          </div>
        </div>
      ))}
    </GridContainer>
  );
};

export default Banks;
