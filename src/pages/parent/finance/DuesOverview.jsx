import React from 'react';
import { Landmark, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DuesOverview({ parentFees = [], navigateToPay }) {
  const totalDue = parentFees.filter(f => f.status === 'Pending').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = parentFees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + f.amount, 0);
  const totalOverall = totalDue + totalPaid;
  const paidPercent = totalOverall > 0 ? Math.round((totalPaid / totalOverall) * 100) : 100;

  return (
    <div className="page-container">
      <h2 className="section-title"><Landmark color="var(--primary)" /> Ward's Consolidated Fee Dues</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Overview of your ward's pending, verified, and settled academic invoices.</p>

      {/* Progress Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '24px' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyBetween: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Payment Completion Status</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent)' }}>{paidPercent}%</span>
            <span style={{ color: 'var(--text-muted)' }}>of ₹{totalOverall.toLocaleString('en-IN')} settled</span>
          </div>

          <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ width: `${paidPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '4px' }}></div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Outstanding Dues: <strong style={{ color: 'var(--error)' }}>₹{totalDue.toLocaleString('en-IN')}</strong></span>
            <span style={{ color: 'var(--text-secondary)' }}>Paid Amount: <strong style={{ color: 'var(--accent)' }}>₹{totalPaid.toLocaleString('en-IN')}</strong></span>
          </div>
        </div>

        {/* Action Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', background: 'rgba(var(--primary-rgb), 0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Direct Payment</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Make a fast, direct payment using credit/debit card or UPI. A receipt is generated instantly.</p>
          <button className="btn-primary" onClick={navigateToPay}>
            Access Portal Gateway <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Bill Items */}
      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Fee Breakdown</h3>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Fee Category</th>
              <th>Due Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parentFees.map((fee, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{fee.name}</td>
                <td>{fee.deadline}</td>
                <td>₹{fee.amount.toLocaleString('en-IN')}</td>
                <td>
                  <span className={`badge ${fee.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
