import React, { useState } from 'react';
import { Landmark, Users, Clipboard, Check, X, ShieldAlert } from 'lucide-react';

export default function ClubAdvising() {
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'budget'
  const [memberRequests, setMemberRequests] = useState([
    { id: 'REQ-01', name: 'Aarav Mehta', rollNo: '2023CSE0011', skills: 'Python, Machine Learning', club: 'Google Developer Group', motivation: 'I want to build real-world AI projects and conduct tech talks.' },
    { id: 'REQ-02', name: 'Neha Sharma', rollNo: '2023CSE0054', skills: 'Figma, CSS, HTML', club: 'Google Developer Group', motivation: 'Excited to contribute to UI/UX workshops and web development designs.' },
  ]);

  const [approvedMembersCount, setApprovedMembersCount] = useState(120);

  const [budgets, setBudgets] = useState([
    { item: 'Hackathon Server Hosting', requestedBy: 'GDG President', amount: 15000, status: 'Pending' },
    { item: 'IoT Kit Hardware Components', requestedBy: 'Robotics Lead', amount: 35000, status: 'Pending' },
    { item: 'Guest Lecture Travel Expenses', requestedBy: 'Literary Secretary', amount: 8000, status: 'Approved' },
  ]);

  const handleMemberApproval = (id, approved) => {
    setMemberRequests(memberRequests.filter(req => req.id !== id));
    if (approved) {
      setApprovedMembersCount(approvedMembersCount + 1);
    }
  };

  const handleBudgetApproval = (index, approved) => {
    setBudgets(budgets.map((b, i) => i === index ? { ...b, status: approved ? 'Approved' : 'Rejected' } : b));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Users color="var(--primary)" /> Faculty Club Advising</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Review student membership requests, endorse budgets, and verify active club operations.</p>

      {/* Stats row */}
      <div className="dashboard-grid" style={{ marginBottom: '24px' }}>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>TOTAL MENTORED CLUBS</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>2 Clubs</h2>
        </div>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ACTIVE MEMBERS</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', marginTop: '4px' }}>{approvedMembersCount}</h2>
        </div>
        <div className="glass-card">
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>REMAINING ACCREDITED BUDGET</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--warning)', marginTop: '4px' }}>₹72,000</h2>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginBottom: '20px' }}>
        <button 
          className="btn-secondary" 
          style={{ 
            padding: '8px 16px', fontSize: '14px',
            borderColor: activeTab === 'members' ? 'var(--primary)' : 'transparent',
            background: activeTab === 'members' ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent' 
          }}
          onClick={() => setActiveTab('members')}
        >
          Membership Requests ({memberRequests.length})
        </button>
        <button 
          className="btn-secondary" 
          style={{ 
            padding: '8px 16px', fontSize: '14px',
            borderColor: activeTab === 'budget' ? 'var(--primary)' : 'transparent',
            background: activeTab === 'budget' ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent' 
          }}
          onClick={() => setActiveTab('budget')}
        >
          Budget Proposals ({budgets.filter(b => b.status === 'Pending').length})
        </button>
      </div>

      {activeTab === 'members' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {memberRequests.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
              <Check size={40} color="var(--accent)" style={{ marginBottom: '12px' }} />
              <p>All membership requests have been reviewed!</p>
            </div>
          ) : (
            memberRequests.map((req) => (
              <div key={req.id} className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>{req.name}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Roll No: {req.rollNo} | Target Club: <strong style={{ color: 'var(--primary)' }}>{req.club}</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', gap: '4px', background: 'var(--accent)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }} onClick={() => handleMemberApproval(req.id, true)}>
                      <Check size={14} /> Approve
                    </button>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', gap: '4px', borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => handleMemberApproval(req.id, false)}>
                      <X size={14} /> Decline
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', borderTop: '1px solid var(--glass-border)', paddingTop: '12px' }}>
                  <p><strong>Skills:</strong> <span style={{ color: 'var(--text-secondary)' }}>{req.skills}</span></p>
                  <p><strong>Motivation Statement:</strong> <span style={{ color: 'var(--text-secondary)' }}>"{req.motivation}"</span></p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="table-wrapper" style={{ margin: 0 }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Expense Detail</th>
                <th>Requested By</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((proposal, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proposal.item}</td>
                  <td>{proposal.requestedBy}</td>
                  <td>₹{proposal.amount.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`badge ${
                      proposal.status === 'Approved' ? 'badge-success' :
                      proposal.status === 'Rejected' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td>
                    {proposal.status === 'Pending' ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-primary" style={{ padding: '4px 8px', fontSize: '11px', background: 'var(--accent)', boxShadow: 'none' }} onClick={() => handleBudgetApproval(idx, true)}>
                          Approve
                        </button>
                        <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '11px', borderColor: 'var(--error)', color: 'var(--error)' }} onClick={() => handleBudgetApproval(idx, false)}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
