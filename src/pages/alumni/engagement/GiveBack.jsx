import React, { useState } from 'react';
import PaymentGateway from '../../../components/finance/PaymentGateway';
import { Gift, Heart, ArrowUpRight, Award } from 'lucide-react';

export default function GiveBack() {
  const [funds, setFunds] = useState([
    { id: 'FND-01', title: 'Merit-cum-Means Scholarship Fund', desc: 'Financial aid for students with academic achievements from lower-income backgrounds.', target: 500000, raised: 320000 },
    { id: 'FND-02', title: 'Research & Robotics Lab Equipment', desc: 'Upgrading the hardware stack with modern GPU rigs, IoT kits, and robot parts.', target: 1000000, raised: 450000 },
  ]);

  const [activeDonation, setActiveDonation] = useState(null);
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleDonateSuccess = (txn) => {
    setFunds(funds.map(f => {
      if (f.id === activeDonation.id) {
        return { ...f, raised: f.raised + activeDonation.amount };
      }
      return f;
    }));
    setDonationSuccess(true);
    setTimeout(() => {
      setActiveDonation(null);
      setDonationSuccess(false);
    }, 2000);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Gift color="var(--primary)" /> Alumni Give Back Gateway</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Fund academic infrastructure, set up student scholarship endowments, and sponsor department events.</p>

      {activeDonation ? (
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          {donationSuccess ? (
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Heart size={48} color="var(--accent)" style={{ marginBottom: '12px' }} />
              <h3>Thank you for your generous support!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Your contribution was processed successfully.</p>
            </div>
          ) : (
            <PaymentGateway 
              amount={activeDonation.amount} 
              feeType={`Donation: ${activeDonation.title}`} 
              onSuccess={handleDonateSuccess} 
              onCancel={() => setActiveDonation(null)} 
            />
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {funds.map((fund) => {
            const percent = Math.round((fund.raised / fund.target) * 100);
            const inputId = `amount-${fund.id}`;
            return (
              <div key={fund.id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{fund.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '6px 0 16px', lineHeight: 1.5 }}>{fund.desc}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>Raised: ₹{fund.raised.toLocaleString('en-IN')} / ₹{fund.target.toLocaleString('en-IN')}</span>
                    <span>{percent}% Complete</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '4px' }}></div>
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255, 255, 255, 0.02)' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Contribute Donation Amount</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="number" 
                      className="glass-input" 
                      placeholder="₹5,000" 
                      id={inputId} 
                    />
                    <button 
                      className="btn-primary" 
                      style={{ padding: '10px 16px', fontSize: '13px' }}
                      onClick={() => {
                        const input = document.getElementById(inputId);
                        const val = Number(input ? input.value : 0);
                        if (val > 0) {
                          setActiveDonation({ ...fund, amount: val });
                        }
                      }}
                    >
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
