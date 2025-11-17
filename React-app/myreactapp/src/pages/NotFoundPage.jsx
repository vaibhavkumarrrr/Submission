import React from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  const jwt =localStorage.jwt ;
   return (
    <div className="page">
    { !jwt ?(
    <>
      <h1>Seems You lost your Path</h1>
      <p>Recheck you URL</p>
      <div className="landing-buttons">
      <button onClick={() => navigate('/')}>Visit the correct Page</button>
      </div>
    </>
    ) :(
      <>
      <h1>Seems You lost your Path</h1>
      <p>We know, You have logged in But Recheck you URL</p>
      <div className="landing-buttons">
      <button onClick={() => navigate('/Home')}>Go Back to home</button>
      </div>
      </>
    )
    }
    </div>

  );
}
