import React, { useState } from 'react';

const API_BASE = 'https://localhost:7000';

export default function AuthForm({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rolesInput, setRolesInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const resetFeedback = () => {
    setMessage('');
    setError('');
  };

  const handleRegister = async () => {
    resetFeedback();
    setLoading(true);
    try {
      const roles = rolesInput.split(',').map(r => r.trim()).filter(Boolean);
      const payload = { Username: username, Password: password, Roles: roles.length ? roles : null };

      const res = await fetch(`${API_BASE}/api/Auth/Register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Registration failed');
      setMessage(text || 'Registered successfully.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    resetFeedback();
    setLoading(true);
    try {
      const payload = { Username: username, Password: password };
      const res = await fetch(`${API_BASE}/api/Auth/Login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');
      const token = data?.jwttoken;
      if (!token) throw new Error('No token returned from API');
      onLogin(token);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'register') await handleRegister();
    else await handleLogin();
  };

  return (
    <div className="auth-container">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <div className="mode-toggle">
        <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
        <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
      </div>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Viewonly,SuperUser,Admin,SysAdmin"
            value={rolesInput}
            onChange={(e) => setRolesInput(e.target.value)}
          />
        )}
        <button type="submit" disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
