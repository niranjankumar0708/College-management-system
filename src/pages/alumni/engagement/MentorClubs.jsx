import React, { useState } from 'react';
import { Compass, Users, CheckSquare, MessageSquare } from 'lucide-react';

export default function MentorClubs() {
  const [scheduledSessions, setScheduledSessions] = useState([
    { club: 'Google Developer Group', topic: 'Industry Best Practices in CI/CD and Docker', date: '2026-07-12 14:00', type: 'Tech Talk' },
  ]);

  const [formData, setFormData] = useState({ club: 'Google Developer Group', topic: '', date: '', type: 'Tech Talk' });
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const session = {
      ...formData,
      date: formData.date.replace('T', ' ')
    };
    setScheduledSessions([...scheduledSessions, session]);
    setFormData({ club: 'Google Developer Group', topic: '', date: '', type: 'Tech Talk' });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><MessageSquare color="var(--primary)" /> Mentorship & Guest Sessions</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Share your industry expertise. Conduct interactive technical workshops or mentor student innovation clubs.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {/* Form */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Schedule Guest Session</h3>
          {successMsg && (
            <div className="badge badge-success" style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '8px' }}>
              Mentorship session proposed successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Select Target Club</label>
              <select className="glass-input" style={{ background: 'var(--bg-secondary)', cursor: 'pointer' }} value={formData.club} onChange={(e) => setFormData({ ...formData, club: e.target.value })}>
                <option value="Google Developer Group">Google Developer Group</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Sargam Cultural Club">Sargam Cultural Club</option>
                <option value="Literary Society">Literary Society</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Session Topic / Title</label>
              <input type="text" className="glass-input" placeholder="e.g. Scaling Web Apps with AWS" required value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Session Type</label>
                <select className="glass-input" style={{ background: 'var(--bg-secondary)', cursor: 'pointer' }} value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                  <option value="Tech Talk">Tech Talk</option>
                  <option value="Hands-on Workshop">Hands-on Workshop</option>
                  <option value="Panel Discussion">Panel Discussion</option>
                  <option value="Project Mentorship">Project Mentorship</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Proposed Date & Time</label>
                <input type="datetime-local" className="glass-input" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>Propose Session</button>
          </form>
        </div>

        {/* List of Sessions */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Mentored Sessions History</h3>
          <div className="table-wrapper" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Topic & Club</th>
                  <th>Timings</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {scheduledSessions.map((session, idx) => (
                  <tr key={idx}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{session.topic}</p>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target: {session.club}</span>
                    </td>
                    <td>{session.date}</td>
                    <td><span className="badge badge-info">{session.type}</span></td>
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
