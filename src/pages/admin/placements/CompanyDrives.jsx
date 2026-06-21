import React, { useState } from 'react';
import { Briefcase, Plus, ShieldAlert, Check } from 'lucide-react';

export default function CompanyDrives() {
  const [drives, setDrives] = useState([
    { id: 'DRV-001', company: 'Google India', role: 'Software Engineer Intern', ctc: '35 LPA', cutoff: 8.5, date: '2026-07-02', registered: 42 },
    { id: 'DRV-002', company: 'Microsoft Research', role: 'Research Fellow', ctc: '28 LPA', cutoff: 8.0, date: '2026-07-05', registered: 85 },
    { id: 'DRV-003', company: 'Amazon Dev Center', role: 'Cloud Support Associate', ctc: '18 LPA', cutoff: 7.5, date: '2026-07-10', registered: 142 },
  ]);

  const [formData, setFormData] = useState({ company: '', role: '', ctc: '', cutoff: '', date: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDrive = {
      id: 'DRV-00' + (drives.length + 1),
      company: formData.company,
      role: formData.role,
      ctc: formData.ctc.includes('LPA') ? formData.ctc : `${formData.ctc} LPA`,
      cutoff: Number(formData.cutoff) || 7.0,
      date: formData.date,
      registered: 0
    };
    setDrives([newDrive, ...drives]);
    setFormData({ company: '', role: '', ctc: '', cutoff: '', date: '' });
    setIsAdding(false);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Briefcase color="var(--primary)" /> Placement Company Drives</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Schedule recruitment visits, define eligibility criteria, filter applicants, and track registrations.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Schedule Campus Drive
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Configure Recruitment Drive</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Company Name</label>
              <input type="text" className="glass-input" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Target Role</label>
              <input type="text" className="glass-input" placeholder="e.g. Frontend Engineer" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Compensation CTC (e.g. 15 LPA)</label>
              <input type="text" className="glass-input" required value={formData.ctc} onChange={(e) => setFormData({ ...formData, ctc: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>CGPA Cutoff</label>
              <input type="number" step="0.1" max="10" className="glass-input" placeholder="8.0" required value={formData.cutoff} onChange={(e) => setFormData({ ...formData, cutoff: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Drive Date</label>
              <input type="date" className="glass-input" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Confirm</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Drives Table */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Target Role</th>
              <th>Package (CTC)</th>
              <th>CGPA Cutoff</th>
              <th>Drive Date</th>
              <th>Registered Applicants</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drv) => (
              <tr key={drv.id}>
                <td><span style={{ fontFamily: 'monospace' }}>{drv.id}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{drv.company}</td>
                <td>{drv.role}</td>
                <td style={{ color: 'var(--accent)', fontWeight: 600 }}>{drv.ctc}</td>
                <td>{drv.cutoff}</td>
                <td>{drv.date}</td>
                <td>
                  <span className="badge badge-info">{drv.registered} applied</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
