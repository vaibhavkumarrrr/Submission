import React, { useState } from 'react';
import GridContainer from '../componenets/GridContainer';         
import { loginUser } from '../services/api';
import { useAuth } from '../Context/AuthContext';                
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', mandatoryId: '' });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { username, password, mandatoryId } = form;
    if (!username || !password || !mandatoryId) {
      setError('All fields are required.');
      return;
    }

    setBusy(true);
    try {
      const res = await loginUser({
        Username: username,
        Password: password,
        MandatoryId: mandatoryId,
      });

      if (!res.ok) {
        const msg = res.status === 404 ? 'type mismatch' : res.error || 'Login failed';
        throw new Error(msg);
      }

      const { jwttoken, roles } = res.data;
      if (!jwttoken) throw new Error('No token returned from API');

      const finalRoles = Array.isArray(roles) ? roles : [];

      
      login(jwttoken, finalRoles, mandatoryId);

      navigate('/home', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <GridContainer>
      <div className="col-6 col-lg-12 col-sm-12">
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            <div>
              <label>Username</label>
              <input
                type="email"
                autoComplete="username email"
                placeholder="user@example.com"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Mandatory ID</label>
              <input
                type="text"
                placeholder="Enter your required ID"
                value={form.mandatoryId}
                onChange={(e) => setForm({ ...form, mandatoryId: e.target.value })}
                required
              />
            </div>

            {error && <div style={{ color: 'var(--danger)', fontWeight: 600 }}>{error}</div>}
            <div>
              <button type="submit" disabled={busy}>
                {busy ? 'Signing in…' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </GridContainer>
  );
};

export default Login;