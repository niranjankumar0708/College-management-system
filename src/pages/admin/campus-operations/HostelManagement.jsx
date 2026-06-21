import React, { useState } from 'react';
import { Home, Plus, Users, ShieldAlert } from 'lucide-react';

export default function HostelManagement() {
  const [blocks, setBlocks] = useState([
    { name: 'Ramanujan Block (Block-A)', type: 'Boys Hostel', warden: 'Dr. Ramesh Kumar', capacity: 150, occupied: 142 },
    { name: 'Aryabhatta Block (Block-B)', type: 'Boys Hostel', warden: 'Prof. Anil Gupta', capacity: 150, occupied: 120 },
    { name: 'Kalpana Chawla Block (Block-C)', type: 'Girls Hostel', warden: 'Dr. Sarah Joseph', capacity: 180, occupied: 175 },
  ]);

  const [allocations, setAllocations] = useState([
    { rollNo: '2023CSE0145', student: 'Sanjay', block: 'Block-A', room: '408' },
    { rollNo: '2023ECE0092', student: 'Priya Das', block: 'Block-C', room: '204' }
  ]);

  const [formData, setFormData] = useState({ rollNo: '', student: '', block: 'Block-A', room: '' });
  const [isAllocating, setIsAllocating] = useState(false);

  const handleAllocate = (e) => {
    e.preventDefault();
    setAllocations([...allocations, formData]);
    
    // Update occupied count
    setBlocks(blocks.map(b => {
      if (b.name.includes(formData.block)) {
        return { ...b, occupied: b.occupied + 1 };
      }
      return b;
    }));

    setFormData({ rollNo: '', student: '', block: 'Block-A', room: '' });
    setIsAllocating(false);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Home color="var(--primary)" /> Hostel & Room Management</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Monitor dorm capacity, review active room allotments, assign wardens, and dispatch new allocations.</p>

      {/* Grid of Blocks */}
      <div className="dashboard-grid" style={{ marginBottom: '30px' }}>
        {blocks.map((block, idx) => {
          const avail = block.capacity - block.occupied;
          const percent = Math.round((block.occupied / block.capacity) * 100);
          return (
            <div key={idx} className="glass-card">
              <span className="badge badge-info" style={{ marginBottom: '8px' }}>{block.type}</span>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '4px 0 8px' }}>{block.name}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>Warden: <strong>{block.warden}</strong></p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>Occupancy: {block.occupied}/{block.capacity}</span>
                <span>{avail} vacancies</span>
              </div>
              <div style={{ height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: percent > 90 ? 'var(--error)' : 'var(--primary)', borderRadius: '3px' }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Student Allotment Roster</h3>
        {!isAllocating && (
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }} onClick={() => setIsAllocating(true)}>
            Allot Room
          </button>
        )}
      </div>

      {isAllocating && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>New Room Allocation</h3>
          <form onSubmit={handleAllocate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Student Roll Number</label>
              <input type="text" className="glass-input" required value={formData.rollNo} onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Student Name</label>
              <input type="text" className="glass-input" required value={formData.student} onChange={(e) => setFormData({ ...formData, student: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Select Block</label>
              <select className="glass-input" style={{ background: 'var(--bg-secondary)' }} value={formData.block} onChange={(e) => setFormData({ ...formData, block: e.target.value })}>
                <option value="Block-A">Block-A (Boys)</option>
                <option value="Block-B">Block-B (Boys)</option>
                <option value="Block-C">Block-C (Girls)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Room Number</label>
              <input type="text" className="glass-input" placeholder="e.g. 104" required value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Confirm</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAllocating(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Roster Table */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Dorm Block</th>
              <th>Room Allotted</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc, idx) => (
              <tr key={idx}>
                <td><span style={{ fontFamily: 'monospace' }}>{alloc.rollNo}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{alloc.student}</td>
                <td>{alloc.block}</td>
                <td>{alloc.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
