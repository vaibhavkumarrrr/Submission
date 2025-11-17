import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#fff' : '#ccc',
    textDecoration: location.pathname === path ? 'Underline' : 'none',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
  });

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link style={linkStyle('/Home')} to="/Home">Home</Link>
        <Link style={linkStyle('/settings')} to="/settings">Settings</Link>
        <Link style={linkStyle('/users')} to="/users">Users</Link>
        <Link style={linkStyle('/about')} to="/about">About</Link>
      </div>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );
}
