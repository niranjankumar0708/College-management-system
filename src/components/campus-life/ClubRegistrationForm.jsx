import React, { useState } from 'react';
import { User, Mail, Send, Award, CheckCircle2 } from 'lucide-react';

export default function ClubRegistrationForm({ clubName = 'Tech Club', onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: 'Sanjay',
    rollNo: '2023CSE0145',
    dept: 'Computer Science',
    skills: '',
    motivation: '',
    agreed: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreed) return;
    
    setSubmitted(true);
    if (onSubmit) {
      setTimeout(() => {
        onSubmit({
          ...formData,
          clubName,
          appliedDate: new Date().toISOString().split('T')[0]
        });
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card text-center py-12" style={{ textAlign: 'center', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CheckCircle2 className="text-accent mb-4" size={56} style={{ color: 'var(--accent)' }} />
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Application Submitted!</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Your membership request for <strong>{clubName}</strong> is sent to the faculty advisor.
        </p>
        <button className="btn-primary" onClick={onCancel}>Close Window</button>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ maxWidth: '550px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Club Membership Application</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Applying for: <strong style={{ color: 'var(--primary)' }}>{clubName}</strong></p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              className="glass-input" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Roll Number</label>
            <input 
              type="text" 
              className="glass-input" 
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              required 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Relevant Skills (comma separated)</label>
          <input 
            type="text" 
            className="glass-input" 
            placeholder="React, CSS, Python, UI Design"
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '6px' }}>Why do you want to join this club?</label>
          <textarea 
            className="glass-input" 
            rows="3" 
            placeholder="Describe your motivation and expectations..."
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            required
            style={{ resize: 'vertical', minHeight: '80px' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '8px' }}>
          <input 
            type="checkbox" 
            id="club-agree" 
            checked={formData.agreed}
            onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
            style={{ marginTop: '3px', cursor: 'pointer' }}
            required
          />
          <label htmlFor="club-agree" style={{ fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            I agree to participate actively in club events, maintain the code of conduct, and dedicate at least 4 hours/week.
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--glass-border)', paddingTop: '20px', marginTop: '10px' }}>
          <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={!formData.agreed} style={{ opacity: formData.agreed ? 1 : 0.6 }}>
            <Send size={16} /> Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
