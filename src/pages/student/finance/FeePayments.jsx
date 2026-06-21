import React, { useState } from 'react';
import PaymentGateway from '../../../components/finance/PaymentGateway';
import { CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function FeePayments({ addTransaction }) {
  const [fees, setFees] = useState([
    { id: 'tuition', name: 'Tuition Fee (IV Sem)', amount: 75000, deadline: '2026-07-15', status: 'Pending' },
    { id: 'exam', name: 'Exam Fee (IV Sem)', amount: 2500, deadline: '2026-06-30', status: 'Pending' },
    { id: 'hostel', name: 'Hostel & Mess Charges', amount: 45000, deadline: '2026-07-01', status: 'Paid' },
  ]);
  const [activePayment, setActivePayment] = useState(null);

  const handlePaymentSuccess = (txn) => {
    setFees(fees.map(f => f.id === activePayment.id ? { ...f, status: 'Paid' } : f));
    addTransaction({
      id: txn.id,
      date: txn.date,
      name: activePayment.name,
      amount: activePayment.amount,
      status: 'SUCCESS',
      method: txn.method
    });
    setTimeout(() => setActivePayment(null), 3000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><CreditCard color="var(--primary)" /> Fee Gateways & Payments</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Verify and pay your outstanding academic, examination, and hostel fees below.</p>

      {activePayment ? (
        <PaymentGateway 
          amount={activePayment.amount} 
          feeType={activePayment.name} 
          onSuccess={handlePaymentSuccess} 
          onCancel={() => setActivePayment(null)} 
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {fees.map((fee) => (
            <div key={fee.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '6px' }}>{fee.name}</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <span>Amount: <strong style={{ color: 'var(--text-primary)' }}>₹{fee.amount.toLocaleString('en-IN')}</strong></span>
                  <span>Due Date: {fee.deadline}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {fee.status === 'Paid' ? (
                  <span className="badge badge-success"><CheckCircle size={14} /> Paid</span>
                ) : (
                  <>
                    <span className="badge badge-warning"><Clock size={14} /> Pending</span>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }} onClick={() => setActivePayment(fee)}>
                      Pay Now
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
