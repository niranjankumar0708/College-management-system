import React, { useState } from 'react';
import { CalendarCheck, Check, X, FileText } from 'lucide-react';

export default function EventApprovals() {
  const [proposals, setProposals] = useState([
    { id: 'PROP-01', title: 'Generative AI Masterclass', club: 'Google Developer Group', date: '2026-06-28', venue: 'Seminar Hall 2', desc: 'A hands-on workshop guiding students to build applications using LLM API services.', status: 'Pending', feedback: '' },
    { id: 'PROP-02', title: 'Eduspire Esports League', club: 'Titans Sports Club', date: '2026-07-04', venue: 'Common Room Blocks', desc: 'Intra-college multiplayer gaming tournament focusing on strategy and communication.', status: 'Pending', feedback: '' }
  ]);

  const handleAction = (id, newStatus, feedbackText) => {
    setProposals(proposals.map(p => p.id === id ? { ...p, status: newStatus, feedback: feedbackText } : p));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><CalendarCheck color="var(--primary)" /> Student Event Proposals</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Review and endorse event proposals submitted by student coordinators. Allocate resources and verify dates.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {proposals.length === 0 || proposals.every(p => p.status !== 'Pending') ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
            <CalendarCheck size={40} color="var(--accent)" style={{ marginBottom: '12px' }} />
            <p>No pending event proposals to review!</p>
          </div>
        ) : (
          proposals.filter(p => p.status === 'Pending').map((prop) => {
            let feedbackVal = '';
            return (
              <div key={prop.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{prop.title}</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Organized by: <strong style={{ color: 'var(--primary)' }}>{prop.club}</strong> | Proposed Date: {prop.date} | Venue: {prop.venue}</p>
                  </div>
                  <span className="badge badge-warning">Awaiting Approval</span>
                </div>

                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Description / Agenda:</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{prop.desc}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Endorsement Feedback / Remarks</label>
                  <input 
                    type="text" 
                    className="glass-input" 
                    placeholder="Enter approval conditions or rejection reasons..." 
                    id={`feedback-${prop.id}`}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ borderColor: 'var(--error)', color: 'var(--error)', padding: '8px 16px', fontSize: '13px' }}
                    onClick={() => {
                      const input = document.getElementById(`feedback-${prop.id}`);
                      handleAction(prop.id, 'Rejected', input ? input.value : '');
                    }}
                  >
                    <X size={14} /> Deny Proposal
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ background: 'var(--accent)', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', padding: '8px 16px', fontSize: '13px' }}
                    onClick={() => {
                      const input = document.getElementById(`feedback-${prop.id}`);
                      handleAction(prop.id, 'Approved', input ? input.value : '');
                    }}
                  >
                    <Check size={14} /> Endorse & Approve
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
