import React, { useState } from 'react';
import { Landmark, Users, Check, RefreshCw } from 'lucide-react';

export default function Payroll() {
  const [employees, setEmployees] = useState([
    { id: 'EMP-084', name: 'Dr. Ramesh Kumar', role: 'Hostel Warden / Professor', dept: 'CS Department', base: 95000, allowance: 8000, status: 'Pending' },
    { id: 'EMP-112', name: 'Dr. Sarah Joseph', role: 'Faculty Advisor', dept: 'ECE Department', base: 110000, allowance: 10000, status: 'Paid' },
    { id: 'EMP-014', name: 'Ravi Verma', role: 'Bus Supervisor', dept: 'Transport Dept', base: 35000, allowance: 2500, status: 'Pending' },
    { id: 'EMP-204', name: 'Kiran Sen', role: 'Librarian Head', dept: 'Library Services', base: 45000, allowance: 3000, status: 'Paid' },
  ]);

  const [processing, setProcessing] = useState(false);
  const [month, setMonth] = useState('June 2026');

  const handleProcessPayroll = () => {
    setProcessing(true);
    setTimeout(() => {
      setEmployees(employees.map(emp => ({ ...emp, status: 'Paid' })));
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Landmark color="var(--primary)" /> Staff Salaries & Payroll</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Authorize payouts, manage allowances, track Deductions, and trigger payroll dispatch cycles.</p>

      {/* Control panel */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Dispatch cycle: {month}</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Unprocessed payouts: <strong style={{ color: 'var(--warning)' }}>{employees.filter(e => e.status === 'Pending').length}</strong> staff items
          </p>
        </div>
        <button 
          className="btn-primary" 
          disabled={processing || employees.every(e => e.status === 'Paid')} 
          onClick={handleProcessPayroll}
          style={{ opacity: employees.every(e => e.status === 'Paid') ? 0.6 : 1 }}
        >
          {processing ? 'Processing Outflows...' : 'Process All Pending Payouts'}
        </button>
      </div>

      {/* Staff Roster */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name & Designation</th>
              <th>Department</th>
              <th>Basic Salary</th>
              <th>Allowance</th>
              <th>Net Payout</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const net = emp.base + emp.allowance;
              return (
                <tr key={emp.id}>
                  <td><span style={{ fontFamily: 'monospace' }}>{emp.id}</span></td>
                  <td>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{emp.name}</p>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{emp.role}</span>
                  </td>
                  <td>{emp.dept}</td>
                  <td>₹{emp.base.toLocaleString('en-IN')}</td>
                  <td>₹{emp.allowance.toLocaleString('en-IN')}</td>
                  <td><strong style={{ color: 'var(--text-primary)' }}>₹{net.toLocaleString('en-IN')}</strong></td>
                  <td>
                    <span className={`badge ${emp.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                      {emp.status}
                    </span>
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
