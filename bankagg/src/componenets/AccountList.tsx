import React, { useEffect, useState } from 'react';
import { accountsApi } from '../services/accounts';
import type { AccountListItemDto, PagedResult } from '../services/api';


const formatINR = (n?: number) =>
  typeof n === 'number' ? new Intl.NumberFormat(undefined, { style: 'currency', currency: 'INR' }).format(n) : '-';

const accountTypeLabel = (t?: number) => {
  switch (t) {
    case 1: return 'Savings';
    case 2: return 'Current';
    case 3: return 'Salary';
    default: return t != null ? `Type ${t}` : 'Account';
  }
};

const AccountsList: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [data, setData] = useState<PagedResult<AccountListItemDto> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    const res = await accountsApi.listPaged(pageNumber, pageSize);
    if (res.ok) {
      const totalPages = Math.max(1, Math.ceil(res.data.totalCount / res.data.pageSize));
      setData({ ...res.data, totalPages });
    } else {
      setError(res.error);
      setData(null);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [pageNumber, pageSize]);

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>All Accounts</h3>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label>Page size</label>
          <select
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); }}
          >
            {[5, 10, 20, 50].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {loading && <p>Loading accounts…</p>}
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {!loading && !error && data && (
        <>
          <p style={{ color: '#94a3b8' }}>
            Showing page {data.pageNumber} of {data.totalPages} — total {data.totalCount} accounts
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {data.items.map(acc => (
              <div key={acc.accountId} className="card">
                <h5>{accountTypeLabel(acc.accountType)}</h5>
                <p>Account ID: {acc.accountId}</p>
                <p>Bank ID: {acc.bankId}</p>
                <p>Balance: {formatINR(acc.balance)}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
            <button
              onClick={() => setPageNumber(p => Math.max(1, p - 1))}
              disabled={data.pageNumber <= 1}
            >
              Prev
            </button>
            <span>Page {data.pageNumber}</span>
            <button
              onClick={() => setPageNumber(p => Math.min(data.totalPages!, p + 1))}
              disabled={data.pageNumber >= (data.totalPages || 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && !error && (!data || data.items.length === 0) && (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default AccountsList;