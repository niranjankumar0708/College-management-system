import React, { useState } from 'react';
import PaymentGateway from '../../../components/finance/PaymentGateway';
import { CreditCard } from 'lucide-react';

export default function PayFees({ parentFees = [], onPaymentSuccess }) {
  const pendingFees = parentFees.filter(f => f.status === 'Pending');
  const [selectedFee, setSelectedFee] = useState(pendingFees[0] || null);
  const [isPaying, setIsPaying] = useState(false);

  const handlePaymentSuccess = (txn) => {
    onPaymentSuccess(selectedFee.id, txn);
    setTimeout(() => {
      setIsPaying(false);
      setSelectedFee(null);
    }, 2000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><CreditCard color="var(--primary)" /> Direct Fee Payment Portal</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Secure payments for tuition, exam, hostel, and canteen charges.</p>

      {isPaying && selectedFee ? (
        <PaymentGateway 
          amount={selectedFee.amount} 
          feeType={selectedFee.name} 
          onSuccess={handlePaymentSuccess} 
          onCancel={() => setIsPaying(false)} 
        />
      ) : (
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>Choose Bill to Pay</h3>
          
          {pendingFees.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-secondary)' }}>
              <p>✓ All fees are settled! No pending dues found.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Select Pending Fee</label>
                <select 
                  className="glass-input" 
                  style={{ background: 'var(--bg-secondary)', cursor: 'pointer' }}
                  value={selectedFee ? selectedFee.id : ''}
                  onChange={(e) => setSelectedFee(pendingFees.find(f => f.id === e.target.value))}
                >
                  {pendingFees.map(f => (
                    <option key={f.id} value={f.id}>{f.name} - ₹{f.amount.toLocaleString('en-IN')}</option>
                  ))}
                </select>
              </div>

              {selectedFee && (
                <div className="glass-panel" style={{ padding: '16px', background: 'rgba(var(--primary-rgb), 0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Amount:</span>
                    <span>₹{selectedFee.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Deadline:</span>
                    <span>{selectedFee.deadline}</span>
                  </div>
                </div>
              )}

              <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={() => setIsPaying(true)}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
