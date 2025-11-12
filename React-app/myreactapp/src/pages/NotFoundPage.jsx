import React from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
   return (
    <div className="page">
      <h1>Seems You lost your Path</h1>
      <p>Recheck you URL</p>
      <div className="landing-buttons">
      <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
}
