import React from 'react';
import { Award, ShieldAlert, Sparkles, Calendar } from 'lucide-react';

export default function MyMemberships({ memberships = [] }) {
  return (
    <div className="page-container">
      <h2 className="section-title"><Sparkles color="var(--primary)" /> My Memberships</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Track your active roles, projects, and event attendance across registered student organizations.</p>

      {memberships.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
          <ShieldAlert size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p>You haven't joined any clubs yet. Go to Clubs & Societies to browse and join communities.</p>
        </div>
      ) : (
        <div className="dashboard-grid">
          {memberships.map((membership, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-info">{membership.role}</span>
                <span className={`badge ${membership.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                  {membership.status}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{membership.clubName}</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <Calendar size={14} color="var(--primary)" />
                <span>Joined on: {membership.joinedDate}</span>
              </div>

              {membership.status === 'Active' && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Meeting Attendance:</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>88%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Active Tasks:</span>
                    <span style={{ fontWeight: 600, color: 'var(--accent)' }}>3 Assigned</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
