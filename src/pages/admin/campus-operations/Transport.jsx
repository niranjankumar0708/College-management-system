import React, { useState } from 'react';
import { Compass, Plus, Users, Trash2 } from 'lucide-react';

export default function Transport() {
  const [routes, setRoutes] = useState([
    { id: 'RT-01', route: 'North Sector Loop (Campus to Majestic)', driver: 'Sohan Singh', contact: '+91 99880 12345', busNo: 'KA-03-F-1204', capacity: 50, occupied: 45 },
    { id: 'RT-02', route: 'South Central Line (Campus to Jayanagar)', driver: 'Ravi Verma', contact: '+91 98450 67890', busNo: 'KA-03-F-8841', capacity: 50, occupied: 50 },
    { id: 'RT-03', route: 'East Extension Route (Campus to Whitefield)', driver: 'Gurpreet Singh', contact: '+91 99000 55432', busNo: 'KA-03-F-3904', capacity: 40, occupied: 22 },
  ]);

  const [formData, setFormData] = useState({ route: '', driver: '', contact: '', busNo: '', capacity: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoute = {
      id: 'RT-0' + (routes.length + 1),
      route: formData.route,
      driver: formData.driver,
      contact: formData.contact,
      busNo: formData.busNo,
      capacity: Number(formData.capacity) || 40,
      occupied: 0
    };
    setRoutes([...routes, newRoute]);
    setFormData({ route: '', driver: '', contact: '', busNo: '', capacity: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setRoutes(routes.filter(r => r.id !== id));
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Compass color="var(--primary)" /> Campus Transport & Bus Routes</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Configure transit routes, assign drivers, verify fleet registry, and check route capacity details.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add Transit Route
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Configure Transit Route</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Route Details</label>
              <input type="text" className="glass-input" placeholder="e.g. West End (Campus to Indiranagar)" required value={formData.route} onChange={(e) => setFormData({ ...formData, route: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Driver Name</label>
              <input type="text" className="glass-input" required value={formData.driver} onChange={(e) => setFormData({ ...formData, driver: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Driver Phone</label>
              <input type="text" className="glass-input" required value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Vehicle Number</label>
              <input type="text" className="glass-input" placeholder="KA-03-F-1234" required value={formData.busNo} onChange={(e) => setFormData({ ...formData, busNo: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Capacity</label>
              <input type="number" className="glass-input" placeholder="50" required value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Save</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Transit Table */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Route Details</th>
              <th>Assigned Vehicle</th>
              <th>Driver Info</th>
              <th>Occupancy Ratio</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => {
              const full = r.occupied >= r.capacity;
              return (
                <tr key={r.id}>
                  <td><span style={{ fontFamily: 'monospace' }}>{r.id}</span></td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.route}</td>
                  <td><span style={{ fontFamily: 'monospace' }}>{r.busNo}</span></td>
                  <td>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.driver}</p>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.contact}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${full ? 'badge-error' : 'badge-success'}`}>
                        {r.occupied} / {r.capacity} seats
                      </span>
                    </div>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '6px', borderColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)' }} onClick={() => handleDelete(r.id)}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
