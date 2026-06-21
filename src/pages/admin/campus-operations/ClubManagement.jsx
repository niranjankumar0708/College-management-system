import React, { useState } from 'react';
import { Compass, Plus, UserCheck, ShieldAlert } from 'lucide-react';

export default function ClubManagement() {
  const [clubs, setClubs] = useState([
    { id: 'CLB-01', name: 'Google Developer Group', lead: 'Dr. Sarah Joseph', category: 'Tech', status: 'Active' },
    { id: 'CLB-02', name: 'Sargam Cultural Club', lead: 'Prof. Anil Gupta', category: 'Cultural', status: 'Active' },
    { id: 'CLB-03', name: 'Titans Sports Club', lead: 'Coach Ravi Shastri', category: 'Sports', status: 'Active' },
    { id: 'CLB-04', name: 'Robotics & Automation', lead: 'Dr. Ramesh Kumar', category: 'Tech', status: 'Active' },
  ]);

  const [formData, setFormData] = useState({ name: '', lead: '', category: 'Tech' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClub = {
      id: 'CLB-0' + (clubs.length + 1),
      name: formData.name,
      lead: formData.lead,
      category: formData.category,
      status: 'Active'
    };
    setClubs([...clubs, newClub]);
    setFormData({ name: '', lead: '', category: 'Tech' });
    setIsAdding(false);
  };

  const toggleArchive = (id) => {
    setClubs(clubs.map(c => c.id === id ? { ...c, status: c.status === 'Active' ? 'Archived' : 'Active' } : c));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Compass color="var(--primary)" /> Campus Club Management</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Establish new student clubs, archive inactive organizations, and assign faculty coordinators.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Establish New Club
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Configure New Club</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Club Name</label>
              <input type="text" className="glass-input" placeholder="e.g. Photography Club" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Faculty Lead Advisor</label>
              <input type="text" className="glass-input" placeholder="e.g. Prof. Malhotra" required value={formData.lead} onChange={(e) => setFormData({ ...formData, lead: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Category</label>
              <select className="glass-input" style={{ background: 'var(--bg-secondary)' }} value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Save</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Clubs Roster */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Club Name</th>
              <th>Faculty Lead</th>
              <th>Category</th>
              <th>Operational Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((c) => (
              <tr key={c.id}>
                <td><span style={{ fontFamily: 'monospace' }}>{c.id}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                <td>{c.lead}</td>
                <td><span className="badge badge-info">{c.category}</span></td>
                <td>
                  <span className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => toggleArchive(c.id)}>
                    {c.status === 'Active' ? 'Archive' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
