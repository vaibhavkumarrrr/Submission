
import React, { useEffect, useState } from 'react';
import { userApi, type Account, type UpdateUserRequest, type User } from '../services/api';


interface Props {
  userId: string | number;
}

function toDateInputValue(iso?: string) {
  if (!iso) return '';
  
  const d = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
}
function fromDateInputValue(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString();
}
const currency = (n?: number, c?: string) =>
  typeof n === 'number' ? new Intl.NumberFormat(undefined, { style: 'currency', currency: c || 'INR' }).format(n) : '-';

const UserInfoCard: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<UpdateUserRequest>({});

  const load = async () => {
    setLoading(true); setError(null);
    const [uRes, aRes] = await Promise.all([ userApi.get(userId), userApi.accounts(userId) ]);

    if (uRes.ok) setUser(uRes.data);
    else setError(uRes.error);

    if (aRes.ok) setAccounts(aRes.data || []);
    else setError(aRes.error);

    setLoading(false);
  };

  useEffect(() => { load(); }, [userId]);

  const onSave = async () => {
    if (!user) return;
    const payload: UpdateUserRequest = { ...editing };
    const res = await userApi.update(user.id, payload);
    if (res.ok) {
      setEditing({});
      await load();
    } else setError(res.error);
  };

  const onDeleteUser = async () => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    if (!user) return;
    const res = await userApi.remove(user.id);
    if (res.ok) { setUser(null); setAccounts([]); }
    else setError(res.error);
  };

  if (loading) return <div className="card"><p>Loading user…</p></div>;
  if (error) return <div className="card"><p style={{ color: '#ef4444' }}>{error}</p></div>;
  if (!user) return <div className="card"><p>No user found.</p></div>;

  const dobInput = editing.dateofbirth ?? user.dateofbirth;

  return (
    <div className="card">
      <h3>User Info</h3>
      <p style={{ color: '#94a3b8' }}>Basic details and linked accounts.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            value={editing.userName ?? user.userName ?? ''}
            onChange={(e) => setEditing(prev => ({ ...prev, userName: e.target.value }))}
          />
        </div>
        <div>
          <label>User Email</label>
          <input
            type="email"
            value={editing.userEmail ?? user.userEmail ?? ''}
            onChange={(e) => setEditing(prev => ({ ...prev, userEmail: e.target.value }))}
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={toDateInputValue(dobInput)}
            onChange={(e) => setEditing(prev => ({ ...prev, dateofbirth: fromDateInputValue(e.target.value) }))}
          />
        </div>
        <div>
          <label>Employee Id</label>
          <input
            type="number"
            value={editing.employeeId ?? user.employeeId ?? 0}
            onChange={(e) => setEditing(prev => ({ ...prev, employeeId: Number(e.target.value) }))}
          />
        </div>
        <div>
          <label>Employee Name</label>
          <input
            type="text"
            value={editing.employeeName ?? user.employeeName ?? ''}
            onChange={(e) => setEditing(prev => ({ ...prev, employeeName: e.target.value }))}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={onSave}>Save</button>
        <button onClick={onDeleteUser} style={{ color: '#ef4444' }}>Delete User</button>
      </div>

      <hr style={{ margin: '16px 0' }} />

      <h4>Accounts</h4>
      {accounts.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No accounts linked.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {accounts.map(acc => (
            <div key={acc.bankId} className="card">
              <h5>Account Type: {acc.accountType ?? 'Account'}</h5>
              <p>AccountNumber: {acc.accountId ?? '-'}</p>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;