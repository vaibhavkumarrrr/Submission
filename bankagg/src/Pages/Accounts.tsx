import React, { useEffect, useRef, useState } from 'react';
import GridContainer from '../componenets/GridContainer';
import { useAuth } from '../Context/AuthContext';
import { getMandatoryId } from '../services/storage';
import {
  getAllAccounts,
  getCurrentAccounts,
  getSavingsAccounts,
  getFDAccounts,
  type AccountListItem,
} from '../services/accounts';
import type { HttpResult } from '../services/http';

// -------------------------------------------
// Helpers
// -------------------------------------------

type TabKey = 'overview' | 'current' | 'savings' | 'fd';

const TYPE_CODE: Record<Exclude<TabKey, 'overview'>, number> = {
  current: 2,
  savings: 1,
  fd: 3,
};

// Robust normalizer
function normalizeListToItems(data: any): { items: any[]; totalCount: number } {
  if (data && Array.isArray(data.items)) {
    const total = Number.isFinite(data.totalCount) ? data.totalCount : data.items.length;
    return { items: data.items, totalCount: total };
  }
  if (Array.isArray(data)) {
    return { items: data, totalCount: data.length };
  }
  if (data && Array.isArray(data.data)) {
    const total = Number.isFinite(data.totalCount) ? data.totalCount : data.data.length;
    return { items: data.data, totalCount: total };
  }
  if (data && Array.isArray(data.results)) {
    const total = Number.isFinite(data.totalCount) ? data.totalCount : data.results.length;
    return { items: data.results, totalCount: total };
  }
  if (data && typeof data === 'object') {
    return { items: [data], totalCount: 1 };
  }
  return { items: [], totalCount: 0 };
}

function labelForType(t: number) {
  switch (Number(t)) {
    case 2: return 'Current';
    case 1: return 'Savings';
    case 3: return 'Fixed Deposit';
    default: return 'Unknown';
  }
}

function filterByTab(items: any[], tab: TabKey): any[] {
  if (tab === 'overview') return items;
  const code = TYPE_CODE[tab];
  return items.filter(i => Number(i.accountType) === code);
}

// Section renderer with filtering
function renderSectionForTab(
  tab: TabKey,
  res: HttpResult<any> | null,
  emptyText: string,
  currentPage: number,
  onChangePage: (p: number) => void,
  pageSize: number
) {
  if (!res) return <div style={{ color: '#94a3b8' }}>Loading…</div>;

  if (res.ok) {
    const { items: rawItems, totalCount } = normalizeListToItems(res.data);

    const items = rawItems;

    const totalPages = Math.max(
      1,
      Math.ceil((Number.isFinite(totalCount) ? totalCount : items.length) / pageSize)
    );

    return (
      <>
        <div style={{ display: 'grid', gap: '.75rem', marginBottom: '.75rem' }}>
          {items.map((a: any, idx: number) => (
            <div key={a.accountId ?? idx} style={{
              display: 'flex', justifyContent: 'space-between', gap: '.75rem',
              padding: '.6rem .75rem', border: '1px solid #1f2937',
              borderRadius: 10, background: '#0b1221'
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>
                  #{a.accountId ?? '—'} • {labelForType(a.accountType)} • Bank #{a.bankId ?? '—'}
                </div>
                <div style={{ color: '#94a3b8' }}>
                  Balance: {Number(a.balance ?? a.principal ?? 0).toLocaleString()}
                </div>
              </div>
              <span style={{
                padding: '0.2rem 0.5rem', borderRadius: 999, border: '1px solid #334155',
                color: '#94a3b8', fontSize: '.75rem'
              }}>
                {labelForType(a.accountType)}
              </span>
            </div>
          ))}
          {!items.length && <div style={{ color: '#94a3b8' }}>{emptyText}</div>}
        </div>

        <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
          <button className="secondary" onClick={() => onChangePage(Math.max(1, currentPage - 1))} disabled={currentPage <= 1}>Prev</button>

          <span style={{
            padding: '0.2rem 0.5rem', borderRadius: 999, border: '1px solid #334155',
            color: '#94a3b8', fontSize: '.75rem'
          }}>
            Page {currentPage} / {totalPages}
          </span>

          <button className="secondary" onClick={() => onChangePage(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button>
        </div>
      </>
    );
  }

  if (res.status === 404) {
    return <div style={{ color: 'var(--danger)', fontWeight: 600 }}>type mismatch</div>;
  }

  return <div style={{ color: 'var(--danger)', fontWeight: 600 }}>{res.error}</div>;
}



// -------------------------------------------
// Component
// -------------------------------------------

const Accounts: React.FC = () => {
  const { user } = useAuth();
  const mandatoryId = user?.mandatoryId ?? getMandatoryId() ?? '';

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [page, setPage] = useState({ overview: 1, current: 1, savings: 1, fd: 1 });
  const pageSize = 10;

  // Raw HttpResult objects
  const [overviewRes, setOverviewRes] = useState<HttpResult<any> | null>(null);
  const [currentRes,  setCurrentRes ] = useState<HttpResult<any> | null>(null);
  const [savingsRes,  setSavingsRes ] = useState<HttpResult<any> | null>(null);
  const [fdRes,       setFdRes      ] = useState<HttpResult<any> | null>(null);

  const [loading, setLoading] = useState(false);
  const reqIdRef = useRef(0);

  const load = async () => {
    if (!mandatoryId) return;

    setLoading(true);
    const myReq = ++reqIdRef.current;

    const [ov, cu, sv, fd] = await Promise.all([
      getAllAccounts(mandatoryId, page.overview, pageSize),
      getCurrentAccounts(mandatoryId, page.current, pageSize),
      getSavingsAccounts(mandatoryId, page.savings, pageSize),
      getFDAccounts(mandatoryId, page.fd, pageSize),
    ]);

    if (myReq === reqIdRef.current) {
      setOverviewRes(ov);
      setCurrentRes(cu);
      setSavingsRes(sv);
      setFdRes(fd);
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [mandatoryId, page.overview, page.current, page.savings, page.fd]);

  return (
    <GridContainer>

      {/* Header */}
      <div className="col-12">
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>Accounts</h2>
            <div style={{ color: '#94a3b8' }}>
              Mandatory ID: <b>{mandatoryId || '—'}</b>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '.5rem' }}>
            {(['overview','current','savings','fd'] as TabKey[]).map(t => (
              <button key={t} className={activeTab === t ? '' : 'secondary'} onClick={() => setActiveTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
            <button className="secondary" onClick={load} disabled={loading}>
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Lists */}
      <div className="col-8 col-lg-12 col-sm-12">

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>All Accounts</h3>
            {renderSectionForTab(
              'overview', overviewRes, 'No accounts found.',
              page.overview, p => setPage(s => ({ ...s, overview: p })), pageSize
            )}
          </div>
        )}

        {/* Current */}
        {activeTab === 'current' && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Current Accounts</h3>
            {renderSectionForTab(
              'current', currentRes, 'No current accounts.',
              page.current, p => setPage(s => ({ ...s, current: p })), pageSize
            )}
          </div>
        )}

        {/* Savings */}
        {activeTab === 'savings' && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Savings Accounts</h3>
            {renderSectionForTab(
              'savings', savingsRes, 'No savings accounts.',
              page.savings, p => setPage(s => ({ ...s, savings: p })), pageSize
            )}
          </div>
        )}

        {/* FD */}
        {activeTab === 'fd' && (
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Fixed Deposits</h3>
            {renderSectionForTab(
              'fd', fdRes, 'No fixed deposits.',
              page.fd, p => setPage(s => ({ ...s, fd: p })), pageSize
            )}
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="col-4 col-lg-4 col-sm-12">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Actions</h3>
          <div style={{ color: '#94a3b8' }}>
          

            Use this area for Create / Edit options.
          </div>
        </div>
      </div>
    </GridContainer>
  );
};

export default Accounts;
