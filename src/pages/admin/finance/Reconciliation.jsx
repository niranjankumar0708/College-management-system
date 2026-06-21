import React, { useState } from 'react';
import { RefreshCw, CheckCircle, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function Reconciliation() {
  const [logs, setLogs] = useState([
    { id: 'TXN4931894101', student: 'Sanjay', rollNo: '2023CSE0145', amount: 75000, date: '2026-06-20', status: 'SUCCESS', recon: 'Reconciled' },
    { id: 'TXN8912403194', student: 'Priya Das', rollNo: '2023ECE0092', amount: 2500, date: '2026-06-19', status: 'SUCCESS', recon: 'Disputed' },
    { id: 'TXN3049182390', student: 'Rohit Sharma', rollNo: '2023MEE0012', amount: 45000, date: '2026-06-18', status: 'FAILED', recon: 'Unreconciled' },
    { id: 'TXN9041289381', student: 'Karan Malhotra', rollNo: '2024CSE0083', amount: 80000, date: '2026-06-17', status: 'SUCCESS', recon: 'Reconciled' },
  ]);

  const [filter, setFilter] = useState('All');
  const [reconSuccess, setReconSuccess] = useState('');

  const handleReconcile = (id) => {
    setLogs(logs.map(log => log.id === id ? { ...log, recon: 'Reconciled' } : log));
    setReconSuccess(`Transaction ${id} verified and marked as Reconciled.`);
    setTimeout(() => setReconSuccess(''), 3000);
  };

  const filteredLogs = filter === 'All' ? logs : logs.filter(l => l.recon === filter);

  return (
    <div className="page-container">
      <h2 className="section-title"><RefreshCw color="var(--primary)" /> Payment Reconciliation</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Audit and reconcile transactions across PG providers (Razorpay/Stripe) and matching student records.</p>

      {reconSuccess && (
        <div className="badge badge-success" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
          {reconSuccess}
        </div>
      )}

      {/* Stats summary */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL RECONCILED</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', marginTop: '4px' }}>₹1,55,000</h2>
        </div>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>DISPUTED ATTEMPTS</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--error)', marginTop: '4px' }}>{logs.filter(l => l.recon === 'Disputed').length}</h2>
        </div>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>UNRECONCILED FAILURES</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--warning)', marginTop: '4px' }}>{logs.filter(l => l.recon === 'Unreconciled').length}</h2>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['All', 'Reconciled', 'Disputed', 'Unreconciled'].map(cat => (
          <button 
            key={cat} 
            className="btn-secondary" 
            style={{ 
              padding: '6px 12px', fontSize: '12px', 
              borderColor: filter === cat ? 'var(--primary)' : 'var(--glass-border)',
              background: filter === cat ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent' 
            }}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Student Details</th>
              <th>Amount</th>
              <th>Gateway Status</th>
              <th>Recon Audit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{log.id}</span></td>
                <td>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{log.student}</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Roll: {log.rollNo}</span>
                </td>
                <td>₹{log.amount.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge ${log.status === 'SUCCESS' ? 'badge-success' : 'badge-error'}`}>
                    {log.status}
                  </span>
                </td>
                <td>
                  <span className={`badge ${
                    log.recon === 'Reconciled' ? 'badge-success' :
                    log.recon === 'Disputed' ? 'badge-error' : 'badge-warning'
                  }`}>
                    {log.recon}
                  </span>
                </td>
                <td>
                  {log.recon !== 'Reconciled' ? (
                    <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleReconcile(log.id)}>
                      Reconcile
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Cleared ✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
