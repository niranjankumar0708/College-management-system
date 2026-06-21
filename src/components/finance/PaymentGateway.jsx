import React, { useState } from 'react';
import { CreditCard, QrCode, Building, ShieldCheck, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function PaymentGateway({ amount = 0, feeType = 'Academic Fees', onSuccess, onCancel }) {
  const [method, setMethod] = useState('card'); // 'card' | 'upi' | 'netbank'
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success' | 'failed'
  const [formData, setFormData] = useState({ cardNo: '', expiry: '', cvv: '', upiId: '' });

  const handlePay = (e) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate API processing
    setTimeout(() => {
      if (method === 'card' && formData.cvv === '000') {
        setStatus('failed');
      } else {
        setStatus('success');
        if (onSuccess) {
          setTimeout(() => onSuccess({
            id: 'TXN' + Math.floor(Math.random() * 9000000000 + 1000000000),
            amount,
            feeType,
            date: new Date().toISOString().split('T')[0],
            method: method.toUpperCase(),
          }), 1500);
        }
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (status === 'processing') {
    return (
      <div className="glass-card text-center py-12 flex flex-col items-center justify-center" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 className="animate-spin text-primary mb-4" size={48} style={{ animation: 'spin 1.5s linear infinite' }} />
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Securing Transaction...</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Do not close this window or refresh the page.</p>
        <div style={{ width: '80%', height: '4px', background: 'var(--glass-border)', borderRadius: '2px', marginTop: '24px', overflow: 'hidden', position: 'relative' }}>
          <div className="pulse-glow" style={{ position: 'absolute', height: '100%', width: '40%', background: 'var(--primary)', borderRadius: '2px', animation: 'slideRight 1.5s infinite ease-in-out' }}></div>
        </div>
        <style>{`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes slideRight { 0% { left: -40%; } 100% { left: 100%; } }
        `}</style>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="glass-card text-center py-12" style={{ textAlign: 'center', padding: '40px 24px', minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle2 className="text-accent mb-4" size={64} style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Payment Successful!</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Your payment of <strong>₹{amount.toLocaleString('en-IN')}</strong> has been processed successfully.</p>
        <div className="glass-panel" style={{ padding: '16px 24px', width: '100%', maxWidth: '360px', marginBottom: '24px', textAlign: 'left', background: 'rgba(var(--primary-rgb), 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Transaction Type:</span>
            <span>{feeType}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Status:</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Settled</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="glass-card text-center py-12" style={{ textAlign: 'center', padding: '40px 24px', minHeight: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <XCircle className="text-error mb-4" size={64} style={{ color: 'var(--error)' }} />
        <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Transaction Failed</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>The card issuer declined the payment. Please verify your details or use a different payment method.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn-secondary" onClick={() => setStatus('idle')}>Try Again</button>
          {onCancel && <button className="btn-secondary" onClick={onCancel}>Cancel</button>}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>Secure Checkout</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Paying for: <strong style={{ color: 'var(--text-primary)' }}>{feeType}</strong></p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(var(--primary-rgb), 0.05)', borderRadius: 'var(--input-radius)', marginBottom: '24px' }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Total Amount Due:</span>
        <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>₹{amount.toLocaleString('en-IN')}</span>
      </div>

      <h4 style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>Select Payment Method</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <button 
          className={`glass-panel`}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', cursor: 'pointer',
            borderColor: method === 'card' ? 'var(--primary)' : 'var(--glass-border)',
            background: method === 'card' ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--glass-bg)'
          }}
          onClick={() => setMethod('card')}
        >
          <CreditCard size={20} color={method === 'card' ? 'var(--primary)' : 'var(--text-secondary)'} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Card</span>
        </button>

        <button 
          className={`glass-panel`}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', cursor: 'pointer',
            borderColor: method === 'upi' ? 'var(--primary)' : 'var(--glass-border)',
            background: method === 'upi' ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--glass-bg)'
          }}
          onClick={() => setMethod('upi')}
        >
          <QrCode size={20} color={method === 'upi' ? 'var(--primary)' : 'var(--text-secondary)'} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>UPI</span>
        </button>

        <button 
          className={`glass-panel`}
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '12px', cursor: 'pointer',
            borderColor: method === 'netbank' ? 'var(--primary)' : 'var(--glass-border)',
            background: method === 'netbank' ? 'rgba(var(--primary-rgb), 0.1)' : 'var(--glass-bg)'
          }}
          onClick={() => setMethod('netbank')}
        >
          <Building size={20} color={method === 'netbank' ? 'var(--primary)' : 'var(--text-secondary)'} />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Net Banking</span>
        </button>
      </div>

      <form onSubmit={handlePay}>
        {method === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Card Number</label>
              <input 
                type="text" 
                className="glass-input" 
                placeholder="4111 2222 3333 4444" 
                required 
                maxLength="19" 
                value={formData.cardNo}
                onChange={(e) => setFormData({ ...formData, cardNo: formatCardNumber(e.target.value) })}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Expiry Date</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  placeholder="MM/YY" 
                  required 
                  maxLength="5" 
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>CVV (Try '000' to fail)</label>
                <input 
                  type="password" 
                  className="glass-input" 
                  placeholder="•••" 
                  required 
                  maxLength="3" 
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {method === 'upi' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '24px', textAlign: 'center' }}>
            <div className="glass-panel" style={{ padding: '16px', background: '#ffffff', borderRadius: '12px' }}>
              {/* Simulated QR Code using SVG */}
              <svg width="140" height="140" viewBox="0 0 100 100" style={{ display: 'block' }}>
                <rect width="100" height="100" fill="#ffffff"/>
                {/* QR corners */}
                <rect x="5" y="5" width="25" height="25" fill="#000000"/>
                <rect x="10" y="10" width="15" height="15" fill="#ffffff"/>
                <rect x="12" y="12" width="11" height="11" fill="#000000"/>
                
                <rect x="70" y="5" width="25" height="25" fill="#000000"/>
                <rect x="75" y="10" width="15" height="15" fill="#ffffff"/>
                <rect x="77" y="12" width="11" height="11" fill="#000000"/>
                
                <rect x="5" y="70" width="25" height="25" fill="#000000"/>
                <rect x="10" y="75" width="15" height="15" fill="#ffffff"/>
                <rect x="12" y="77" width="11" height="11" fill="#000000"/>

                {/* Random blocks */}
                <rect x="40" y="10" width="10" height="20" fill="#000000"/>
                <rect x="55" y="5" width="5" height="10" fill="#000000"/>
                <rect x="40" y="40" width="20" height="20" fill="#000000"/>
                <rect x="70" y="45" width="10" height="10" fill="#000000"/>
                <rect x="10" y="45" width="15" height="5" fill="#000000"/>
                <rect x="45" y="75" width="25" height="15" fill="#000000"/>
                <rect x="80" y="80" width="15" height="10" fill="#000000"/>
              </svg>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Scan QR code with any UPI app (PhonePe, GPay, Paytm) to pay</p>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>OR ENTER UPI ID</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
            </div>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="username@okaxis" 
              value={formData.upiId}
              onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
            />
          </div>
        )}

        {method === 'netbank' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Select Bank</label>
              <select className="glass-input" style={{ background: 'var(--bg-secondary)', cursor: 'pointer' }} required>
                <option value="">-- Choose Your Bank --</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent)', fontSize: '13px' }}>
            <ShieldCheck size={16} />
            <span>256-bit SSL Encrypted</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>}
            <button type="submit" className="btn-primary">Pay ₹{amount.toLocaleString('en-IN')}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
