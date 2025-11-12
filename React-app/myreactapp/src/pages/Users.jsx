import React, { useState } from 'react';

const API_BASE = 'https://localhost:7000';

export default function Users({ jwt }) {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  const getUsers = async () => {
    setError('');
    setData('');
    try {
      const res = await fetch(`${API_BASE}/api/User`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const result = await res.json();
      setData(JSON.stringify(result, null, 2));
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="page">
      <h1>Users</h1>
      <button onClick={getUsers}>Get All Users</button>
      {data && <pre>{data}</pre>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
