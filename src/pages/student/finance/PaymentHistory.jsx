import React, { useState } from 'react';
import InvoiceTemplate from '../../../components/finance/InvoiceTemplate';
import { History, Eye, Download, X } from 'lucide-react';

export default function PaymentHistory({ transactions = [] }) {
  const [selectedTxn, setSelectedTxn] = useState(null);

  return (
    <div className="page-container">
      <h2 className="section-title"><History color="var(--primary)" /> Payment History & Receipts</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Access and download official receipts for all successful payment gateway transactions.</p>

      {selectedTxn && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px', overflowY: 'auto' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '650px' }}>
            <InvoiceTemplate 
              invoice={{
                id: selectedTxn.id,
                date: selectedTxn.date,
                items: [{ name: selectedTxn.name, amount: selectedTxn.amount }],
                paidAmount: selectedTxn.amount,
                method: selectedTxn.method || 'UPI/Card',
              }} 
              onClose={() => setSelectedTxn(null)} 
            />
          </div>
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
          <History size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <p>No recent payment history found. Try paying pending fees first.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</span></td>
                  <td>{txn.date}</td>
                  <td>{txn.name}</td>
                  <td>₹{txn.amount.toLocaleString('en-IN')}</td>
                  <td><span className="badge badge-success">Success</span></td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', gap: '4px' }} onClick={() => setSelectedTxn(txn)}>
                      <Eye size={12} /> View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
