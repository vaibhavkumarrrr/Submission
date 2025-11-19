import React, { useEffect, useMemo, useState } from 'react';
import GridContainer from '../componenets/GridContainer';
import UserInfoCard from '../componenets/UserInfoCard';
import { useAuth } from '../Context/AuthContext';
import { getMandatoryId } from '../services/storage';
import { bankUserApi, userApi, type BankUser, type CreateBankUserRequest, type UpdateBankUserRequest, type User } from '../services/api';
import AccountsList from '../componenets/AccountList';


const Banks: React.FC = () => {
  const { user } = useAuth();
  const mandatoryId = user?.mandatoryId ?? getMandatoryId() ?? '';

  const [banks, setBanks] = useState<BankUser[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingBanks, setLoadingBanks] = useState<boolean>(true);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [errorBanks, setErrorBanks] = useState<string | null>(null);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  const [newBankName, setNewBankName] = useState<string>('');
  const [newEmployeeId, setNewEmployeeId] = useState<string>('');
  const [newEmployeeName, setNewEmployeeName] = useState<string>('');
  const [editing, setEditing] = useState<UpdateBankUserRequest>({
    mandatoryId: mandatoryId,
    bankName: '',
    employeeId: '',
    employeeName: ''
  });

  const loadBanks = async () => {
    if (!mandatoryId) { setErrorBanks('No mandatoryId found.'); setLoadingBanks(false); return; }
    setLoadingBanks(true); setErrorBanks(null);
    const res = await bankUserApi.getByMandatoryId(mandatoryId);
    if (res.ok) {
      const data = res.data;
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      setBanks(arr);
    } else setErrorBanks(res.error);
    setLoadingBanks(false);
  };

  
  const loadUsers = async () => {
    setLoadingUsers(true); setErrorUsers(null);
    const res = await userApi.list();
    if (res.ok) setUsers(res.data || []);
    else setErrorUsers(res.error);
    setLoadingUsers(false);
  };

  useEffect(() => { loadBanks(); loadUsers(); }, [mandatoryId]);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newBankName.trim();
    const employeeId = newEmployeeId.trim();
    const employeeName = newEmployeeName.trim();

    if (!mandatoryId) { setErrorBanks('No mandatoryId found.'); return; }
    if (!name) return;

    const payload: CreateBankUserRequest = {
      mandatoryId,
      bankName: name,
      employeeId,
      employeeName
    };

    const res = await bankUserApi.createForMandatoryId(payload);
    if (res.ok) {
      setNewBankName(''); setNewEmployeeId(''); setNewEmployeeName('');
      await loadBanks();
    } else setErrorBanks(res.error);
  };

 
  const beginEditFrom = (b: BankUser) => {
    setEditing({
      mandatoryId,
      bankName: b.bankName || '',
      employeeId: b.employeeId || '',
      employeeName: b.employeeName || ''
    });
  };

  const onEditField = (field: keyof UpdateBankUserRequest, value: string) => {
    setEditing(prev => ({ ...prev, [field]: value }));
  };

  
  const onSave = async () => {
    if (!mandatoryId) { setErrorBanks('No mandatoryId found.'); return; }
    const res = await bankUserApi.updateByMandatoryId(mandatoryId, editing);
    if (res.ok) {
      setEditing({ mandatoryId, bankName: '', employeeId: '', employeeName: '' });
      await loadBanks();
    } else setErrorBanks(res.error);
  };

  
  const onDelete = async () => {
    if (!mandatoryId) { setErrorBanks('No mandatoryId found.'); return; }
    if (!confirm('Remove this bank user for your mandatoryId?')) return;
    const res = await bankUserApi.removeByMandatoryId(mandatoryId);
    if (res.ok) await loadBanks();
    else setErrorBanks(res.error);
  };

  const banksContent = useMemo(() => {
    if (loadingBanks) return <div className="col-12"><div className="card"><p>Loading banks…</p></div></div>;
    if (errorBanks) return <div className="col-12"><div className="card"><p style={{ color: '#ef4444' }}>{errorBanks}</p></div></div>;
    if (!banks.length) return <div className="col-12"><div className="card"><p>No banks linked for your mandatoryId.</p></div></div>;

    return banks.map((b) => (
      <div key={`${mandatoryId}-${b.bankName}`} className="col-4 col-lg-6 col-sm-12">
        <div className="card">
          <h4>{b.bankName ? `${b.bankName} Bank` : 'Bank'}</h4>

          
          <button style={{ marginTop: 8 }} onClick={() => beginEditFrom(b)}>Edit this</button>
        </div>
      </div>
    ));
  }, [banks, loadingBanks, errorBanks]);

  const usersContent = useMemo(() => {
    if (loadingUsers) return <div className="card"><p>Loading users…</p></div>;
    if (errorUsers) return <div className="card"><p style={{ color: '#ef4444' }}>{errorUsers}</p></div>;
    if (!users.length) return <div className="card"><p>No users found.</p></div>;
    return (
      <div className="card">
        <h3>All Users</h3>
        <ul style={{ marginTop: 8 }}>
          {users.map(u => (
            <li key={u.id}>
              <strong>{u.userName}</strong> — {u.userEmail} — DoB: {new Date(u.dateofbirth).toLocaleDateString()}
              {typeof u.employeeId === 'number' && u.employeeName ? (
                <> — Emp: {u.employeeId} / {u.employeeName}</>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [users, loadingUsers, errorUsers]);

  return (
    <GridContainer>
      
      <div className="col-12">
        {mandatoryId ? (
          <UserInfoCard userId={mandatoryId} />
        ) : (
          <div className="card"><p>No mandatoryId found. Please log in.</p></div>
        )}
      </div>

      <div className="col-12">
        {usersContent}
      </div>

      <div className="col-12">
        <div className="card">
          <h2>Banks</h2>
          <p style={{ color: '#94a3b8' }}>Your connected institutions for this mandatoryId.</p>

          <form onSubmit={onAdd} style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr 120px', marginTop: 12 }}>
            <input
              type="text"
              placeholder="e.g., HDFC"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Employee Id"
              value={newEmployeeId}
              onChange={(e) => setNewEmployeeId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Employee Name"
              value={newEmployeeName}
              onChange={(e) => setNewEmployeeName(e.target.value)}
            />
            <button type="submit">Connect</button>
          </form>
        </div>
      </div>
      
<div className="col-12">
  <AccountsList />
</div>

      <div className="col-12">
        <div className="card">
          <h3>Edit Bank User (by mandatoryId)</h3>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr 1fr' }}>
            <input
              type="text"
              placeholder="Bank name"
              value={editing.bankName}
              onChange={(e) => onEditField('bankName', e.target.value)}
            />
            <input
              type="text"
              placeholder="Employee Id"
              value={editing.employeeId}
              onChange={(e) => onEditField('employeeId', e.target.value)}
            />
            <input
              type="text"
              placeholder="Employee Name"
              value={editing.employeeName}
              onChange={(e) => onEditField('employeeName', e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={onSave}>Save</button>
            <button onClick={onDelete} style={{ color: '#ef4444' }}>Delete</button>
          </div>
        </div>
      </div>

      
      {banksContent}
    </GridContainer>
  );
};

export default Banks;