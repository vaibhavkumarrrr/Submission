import React from 'react';
import GridContainer from '../componenets/GridContainer';
import { useAuth } from '../Context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <GridContainer>
      <div className="col-12">
        <div className="card">
          <h2>Home</h2>
          <p style={{ color: '#94a3b8' }}>
            Welcome{user?.username ? `, ${user.username}` : ''}! Your mandatory ID: <b>{user?.mandatoryId || '—'}</b>
          </p>
        </div>
      </div>

      <div className="col-6 col-lg-12 col-sm-12">
        <div className="card">
          <h3>Quick Actions</h3>
          <ul>
            <li>View Accounts</li>
            <li>Explore Banks</li>
            <li>Update Profile</li>
          </ul>
        </div>
      </div>
      <div className="col-6 col-lg-12 col-sm-12">
        <div className="card">
          <h3>Insights</h3>
          <p style={{ color: '#94a3b8' }}>Some analytics or quick info can go here.</p>
        </div>
      </div>
    </GridContainer>
  );
};

export default Home;