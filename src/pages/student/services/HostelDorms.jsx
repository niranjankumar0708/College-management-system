import React, { useState } from 'react';
import { Home, Clipboard, FileText, Send, Calendar, Clock } from 'lucide-react';

export default function HostelDorms() {
  const [gatePasses, setGatePasses] = useState([
    { id: 'GP-401', reason: 'Weekend Home Visit', outTime: '2026-06-22 17:00', inTime: '2026-06-24 20:00', status: 'Approved' },
    { id: 'GP-382', reason: 'Hackathon Hackathon-Hub Bangalore', outTime: '2026-06-15 08:00', inTime: '2026-06-16 22:00', status: 'Approved' },
  ]);

  const [formData, setFormData] = useState({
    reason: '',
    outTime: '',
    inTime: ''
  });

  const [applySuccess, setApplySuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPass = {
      id: 'GP-' + Math.floor(Math.random() * 900 + 100),
      reason: formData.reason,
      outTime: formData.outTime.replace('T', ' '),
      inTime: formData.inTime.replace('T', ' '),
      status: 'Pending'
    };

    setGatePasses([newPass, ...gatePasses]);
    setFormData({ reason: '', outTime: '', inTime: '' });
    setApplySuccess(true);
    setTimeout(() => setApplySuccess(false), 3000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Home color="var(--primary)" /> Hostel & Dorm Allocations</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>View room allocations, check warden details, and apply for gate passes/no-objections.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '30px', flexWrap: 'wrap' }}>
        {/* Allocation Info & Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Current Allocation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Block / Dorm:</span><span>Ramanujan Block (A-Block)</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Room Number:</span><span>Room 408 (Triple Occupancy)</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Bed / Slot:</span><span>Bed B-2</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Warden:</span><span>Dr. Ramesh Kumar</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Warden Contact:</span><span>+91 98765 43210</span></div>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Apply for Gate Pass</h3>
            {applySuccess && (
              <div className="badge badge-success" style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '8px' }}>
                Gate pass application submitted successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Purpose of Visit</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="e.g. Buying books, visiting home" 
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Out Date/Time</label>
                  <input 
                    type="datetime-local" 
                    className="glass-input" 
                    value={formData.outTime}
                    onChange={(e) => setFormData({ ...formData, outTime: e.target.value })}
                    required 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>In Date/Time</label>
                  <input 
                    type="datetime-local" 
                    className="glass-input" 
                    value={formData.inTime}
                    onChange={(e) => setFormData({ ...formData, inTime: e.target.value })}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}><Send size={16} /> Submit Application</button>
            </form>
          </div>
        </div>

        {/* Gate Pass Logs */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Gate Pass Applications</h3>
          <div className="table-wrapper" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Reason</th>
                  <th>Timings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {gatePasses.map((pass) => (
                  <tr key={pass.id}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{pass.reason}</p>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: {pass.id}</span>
                    </td>
                    <td style={{ fontSize: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} color="var(--primary)" /> Out: {pass.outTime}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}><Clock size={10} color="var(--primary)" /> In: {pass.inTime}</div>
                    </td>
                    <td>
                      <span className={`badge ${pass.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                        {pass.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
