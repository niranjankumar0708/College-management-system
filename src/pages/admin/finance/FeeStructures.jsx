import React, { useState } from 'react';
import { Settings, Plus, FileSpreadsheet, Trash2 } from 'lucide-react';

export default function FeeStructures() {
  const [structures, setStructures] = useState([
    { id: 'FS-01', batch: '2023 Batch (CSE/ECE)', tuition: 75000, lab: 8000, library: 2000, total: 85000 },
    { id: 'FS-02', batch: '2023 Batch (MECH/CIVIL)', tuition: 65000, lab: 10000, library: 2000, total: 77000 },
    { id: 'FS-03', batch: '2024 Batch (CSE/ECE)', tuition: 80000, lab: 8500, library: 2500, total: 91000 },
  ]);

  const [formData, setFormData] = useState({
    batch: '',
    tuition: '',
    lab: '',
    library: ''
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = Number(formData.tuition) || 0;
    const l = Number(formData.lab) || 0;
    const lib = Number(formData.library) || 0;
    const newStructure = {
      id: 'FS-0' + (structures.length + 1),
      batch: formData.batch,
      tuition: t,
      lab: l,
      library: lib,
      total: t + l + lib
    };
    setStructures([...structures, newStructure]);
    setFormData({ batch: '', tuition: '', lab: '', library: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setStructures(structures.filter(s => s.id !== id));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Settings color="var(--primary)" /> Define Fee Structures</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Define standard academic fee slabs, laboratory deposits, and library charges for various courses and admission batches.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add New Slab
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Configure Fee Slab</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Target Batch/Course</label>
              <input type="text" className="glass-input" placeholder="e.g. 2025 Batch (IT)" required value={formData.batch} onChange={(e) => setFormData({ ...formData, batch: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tuition Fee (₹)</label>
              <input type="number" className="glass-input" placeholder="70000" required value={formData.tuition} onChange={(e) => setFormData({ ...formData, tuition: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Laboratory Charges (₹)</label>
              <input type="number" className="glass-input" placeholder="5000" required value={formData.lab} onChange={(e) => setFormData({ ...formData, lab: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Library Charges (₹)</label>
              <input type="number" className="glass-input" placeholder="2000" required value={formData.library} onChange={(e) => setFormData({ ...formData, library: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Save</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Slab ID</th>
              <th>Batch / Department</th>
              <th>Tuition Fee</th>
              <th>Lab Charges</th>
              <th>Library Fee</th>
              <th>Total Annual Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {structures.map((s) => (
              <tr key={s.id}>
                <td><span style={{ fontFamily: 'monospace' }}>{s.id}</span></td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.batch}</td>
                <td>₹{s.tuition.toLocaleString('en-IN')}</td>
                <td>₹{s.lab.toLocaleString('en-IN')}</td>
                <td>₹{s.library.toLocaleString('en-IN')}</td>
                <td><strong style={{ color: 'var(--primary)' }}>₹{s.total.toLocaleString('en-IN')}</strong></td>
                <td>
                  <button className="btn-secondary" style={{ padding: '6px', borderColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)' }} onClick={() => handleDelete(s.id)}>
                    <Trash2 size={14} />
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
