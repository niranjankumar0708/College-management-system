import React, { useState } from 'react';
import { Briefcase, Check, AlertCircle, Building, DollarSign } from 'lucide-react';

export default function Placements() {
  const studentCGPA = 8.45;
  const [drives, setDrives] = useState([
    { id: 'DRV-001', company: 'Google India', role: 'Software Engineer Intern', ctc: '35 LPA', cutoff: 8.5, date: '2026-07-02', status: 'Ineligible' },
    { id: 'DRV-002', company: 'Microsoft Research', role: 'Research Fellow', ctc: '28 LPA', cutoff: 8.0, date: '2026-07-05', status: 'Eligible' },
    { id: 'DRV-003', company: 'Amazon Dev Center', role: 'Cloud Support Associate', ctc: '18 LPA', cutoff: 7.5, date: '2026-07-10', status: 'Applied' },
    { id: 'DRV-004', company: 'TCS Digital', role: 'Systems Engineer', ctc: '7.5 LPA', cutoff: 6.5, date: '2026-07-12', status: 'Eligible' },
  ]);

  const handleApply = (id) => {
    setDrives(drives.map(drv => drv.id === id ? { ...drv, status: 'Applied' } : drv));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Briefcase color="var(--primary)" /> Placement Drives & Placements</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Track visiting campus drives, review package structures, eligibility criteria, and interview dates.</p>

      {/* CGPA Card */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: 'rgba(var(--primary-rgb), 0.05)' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Your Eligibility Profile</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Department: Computer Science & Engineering | Semester: VI</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>CUMULATIVE CGPA:</span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)' }}>{studentCGPA} <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--text-secondary)' }}>/ 10</span></h2>
        </div>
      </div>

      {/* Drives List */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Package (CTC)</th>
              <th>CGPA Cutoff</th>
              <th>Drive Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {drives.map((drv) => (
              <tr key={drv.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building size={16} color="var(--primary)" />
                    <strong style={{ color: 'var(--text-primary)' }}>{drv.company}</strong>
                  </div>
                </td>
                <td>{drv.role}</td>
                <td>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <DollarSign size={13} /> {drv.ctc}
                  </span>
                </td>
                <td>{drv.cutoff}</td>
                <td>{drv.date}</td>
                <td>
                  <span className={`badge ${
                    drv.status === 'Applied' ? 'badge-success' :
                    drv.status === 'Eligible' ? 'badge-info' : 'badge-error'
                  }`}>
                    {drv.status}
                  </span>
                </td>
                <td>
                  {drv.status === 'Eligible' ? (
                    <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleApply(drv.id)}>
                      Apply
                    </button>
                  ) : drv.status === 'Applied' ? (
                    <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Check size={14} /> Applied
                    </span>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} /> Low CGPA
                    </span>
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
