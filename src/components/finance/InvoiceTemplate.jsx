import React from 'react';
import { Printer, Download, Receipt } from 'lucide-react';

export default function InvoiceTemplate({ invoice = {}, onClose }) {
  const defaultInvoice = {
    id: 'REC-2026-8941',
    date: new Date().toISOString().split('T')[0],
    studentName: 'Sanjay',
    rollNo: '2023CSE0145',
    dept: 'Computer Science & Engineering',
    semester: 'IV Semester',
    academicYear: '2025-2026',
    items: [
      { name: 'Tuition Fee (Slab A)', amount: 75000 },
      { name: 'Library Deposit (Refundable)', amount: 5000 },
      { name: 'Laboratory & Internet Charge', amount: 8000 },
      { name: 'Student Activity Fund', amount: 2000 },
    ],
    discount: 0,
    paidAmount: 90000,
    method: 'CARD (Ending 4444)',
    status: 'SUCCESS',
  };

  const data = { ...defaultInvoice, ...invoice };
  const subtotal = data.items.reduce((sum, item) => sum + item.amount, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-card" style={{ maxWidth: '650px', margin: '0 auto', padding: '30px' }} id="invoice-print-area">
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--glass-border)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
            <Receipt size={28} />
            <span style={{ fontSize: '20px', fontWeight: 800, tracking: '0.05em' }}>EDUSPIRE COLLEGE MANAGEMENT SYSTEM</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Eduspire Institute of Technology</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Campus Avenue, Tech City, 560001</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>RECEIPT</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>No: <strong>{data.id}</strong></p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Date: {data.date}</p>
        </div>
      </div>

      {/* Bill To & Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '14px' }}>
        <div>
          <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Paid By:</h4>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{data.studentName}</p>
          <p style={{ color: 'var(--text-secondary)' }}>Roll No: {data.rollNo}</p>
          <p style={{ color: 'var(--text-secondary)' }}>Dept: {data.dept}</p>
        </div>
        <div>
          <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '11px', fontWeight: 700, marginBottom: '6px' }}>Academic Info:</h4>
          <p style={{ color: 'var(--text-secondary)' }}>Year: {data.academicYear}</p>
          <p style={{ color: 'var(--text-secondary)' }}>Semester: {data.semester}</p>
          <p style={{ color: 'var(--text-secondary)' }}>Method: {data.method}</p>
        </div>
      </div>

      {/* Table of Items */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Description</th>
            <th style={{ textAlign: 'right', padding: '10px 0', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <td style={{ padding: '12px 0', color: 'var(--text-primary)', fontSize: '14px' }}>{item.name}</td>
              <td style={{ padding: '12px 0', color: 'var(--text-primary)', fontSize: '14px', textAlign: 'right' }}>₹{item.amount.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
        <div style={{ width: '100%', maxWidth: '240px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
            <span style={{ color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          {data.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent)' }}>
              <span>Waiver/Scholarship:</span>
              <span>-₹{data.discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--glass-border)', paddingTop: '10px', marginTop: '4px', fontWeight: 700, fontSize: '16px' }}>
            <span style={{ color: 'var(--text-primary)' }}>Total Paid:</span>
            <span style={{ color: 'var(--primary)' }}>₹{data.paidAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Signature & Seal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>* This is a computer-generated document and requires no physical signature.</p>
        <div style={{ textAlign: 'center', minWidth: '120px' }}>
          <div style={{ borderBottom: '1px dashed var(--text-muted)', height: '40px', marginBottom: '6px' }}></div>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Accounts Officer</p>
        </div>
      </div>

      {/* Print action / buttons (hidden on actual browser printing) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
        {onClose && <button className="btn-secondary" onClick={onClose}>Close</button>}
        <button className="btn-secondary" onClick={handlePrint}>
          <Printer size={16} /> Print Receipt
        </button>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-print-area, #invoice-print-area * {
            visibility: visible;
          }
          #invoice-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          #invoice-print-area * {
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
