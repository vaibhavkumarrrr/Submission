import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const NavBar: React.FC = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ marginTop: '1rem' }}>
      <nav className="nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" style={{ fontWeight: 800, letterSpacing: '.4px' }}>FinAesthetics</Link>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/accounts">Accounts</Link>
          <Link to="/banks">Banks</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {!token ? (
            <>
              <Link to="/login"><button className="secondary">Login</button></Link>
              <Link to="/register"><button>Register</button></Link>
            </>
          ) : (
            <>
              <span style={{ color: '#94a3b8', fontSize: '.9rem' }}>
                {user?.username} {user?.roles?.length ? `• ${user?.roles.join(', ')}` : ''}
              </span>
              <button className="secondary" onClick={() => { logout(); navigate('/'); }}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
