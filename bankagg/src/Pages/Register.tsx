import React, { useState } from 'react';
import GridContainer from '../componenets/GridContainer';
import { registerUser } from '../services/api';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SECRET_KEY = 'Vaibhav'; // Your hardcoded one-time secret

const Register: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    username: '',
    password: '',
    roles: [] as string[],
  });

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret === SECRET_KEY) {
      setUnlocked(true);
      setError(null);
    } else {
      setError('Invalid secret key.');
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.username || !form.password || !form.roles.length) {
      setError('Username, password, and at least one role are required.');
      return;
    }
    setBusy(true);
    try {
      const { jwttoken } = await registerUser(form);
      // Optional: auto-login after register
      login(jwttoken);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <GridContainer>
      <div className="col-6 col-lg-12 col-sm-12">
        <div className="card">
          <h2>Register</h2>

          {!unlocked ? (
            <form onSubmit={unlock} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div>
                <label>Enter Secret Key</label>
                <input
                  placeholder="Secret key (one-time)"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </div>
              {error && <div style={{ color: 'var(--danger)', fontWeight: 600 }}>{error}</div>}
              <button type="submit">Unlock Registration</button>
            </form>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div>
                <label>Username</label>
                <input
                  placeholder="user@example.com"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div>
                <label>Roles</label>
                <select
                  multiple
                  value={form.roles}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      roles: Array.from(e.target.selectedOptions).map((o) => o.value),
                    })
                  }
                >
                  <option value="ViewOnly">Viewonly</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                  
                </select>
              </div>
              {error && <div style={{ color: 'var(--danger)', fontWeight: 600 }}>{error}</div>}
              <div>
                <button type="submit" disabled={busy}>{busy ? 'Registering…' : 'Register'}</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </GridContainer>
  );
};

export default Register;
