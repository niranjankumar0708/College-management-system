import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, ShieldAlert, Sparkles } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Credentials Database
  const credentials = {
    'student@eduspire.edu': { password: 'student123', role: 'student' },
    'parent@eduspire.edu': { password: 'parent123', role: 'parent' },
    'faculty@eduspire.edu': { password: 'faculty123', role: 'faculty' },
    'admin@eduspire.edu': { password: 'admin123', role: 'admin' },
    'alumni@eduspire.edu': { password: 'alumni123', role: 'alumni' },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const account = credentials[email.toLowerCase().trim()];
    if (account && account.password === password) {
      onLoginSuccess(account.role);
    } else {
      setError('Invalid email address or password. Please try again.');
    }
  };

  const handleQuickLogin = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setError('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Spatial Floating Blobs */}
      <div className="floating-element" style={{ position: 'absolute', top: '15%', left: '10%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(30px)' }}></div>
      <div className="floating-element" style={{ position: 'absolute', bottom: '15%', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.1)', filter: 'blur(40px)', animationDelay: '1.5s' }}></div>

      <div style={{ display: 'flex', gap: '30px', maxWidth: '900px', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Brand Information Panel */}
        <div style={{ flex: 1, minWidth: '320px', paddingRight: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-light), var(--primary))', 
              padding: '16px', 
              borderRadius: '24px', 
              boxShadow: 'var(--clay-button-shadow)',
              color: '#ffffff'
            }}>
              <GraduationCap size={40} />
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', tracking: '-0.02em' }}>EDUSPIRE</h1>
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em' }}>CAMPUS ERP SUITE</span>
            </div>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Welcome to the Next-Gen Portal</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '15px' }}>
            Eduspire ERP is built on a spatial architecture offering multi-role access, real-time fee reconciliation, club registrations, and placement drives.
          </p>
        </div>

        {/* Login Form Panel */}
        <div style={{ flex: '1.1', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="clay-card spatial-layer-2" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Portal Authentication</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>Please supply your academic accounts credentials.</p>

            {error && (
              <div className="badge badge-error" style={{ width: '100%', padding: '12px 16px', marginBottom: '20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  type="email" 
                  className="clay-input" 
                  placeholder="name@eduspire.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={14} /> Password
                </label>
                <input 
                  type="password" 
                  className="clay-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="btn-clay-primary" style={{ justifyContent: 'center', marginTop: '8px', width: '100%' }}>
                Enter Workspace
              </button>
            </form>
          </div>

          {/* Quick Login Assist Panel */}
          <div className="clay-card" style={{ padding: '20px 24px', background: 'rgba(255,255,255,0.7)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="var(--primary)" /> Quick Autofill Credentials
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button className="btn-clay-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => handleQuickLogin('student@eduspire.edu', 'student123')}>
                🎓 Student
              </button>
              <button className="btn-clay-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => handleQuickLogin('parent@eduspire.edu', 'parent123')}>
                👨‍👩‍👧 Parent
              </button>
              <button className="btn-clay-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => handleQuickLogin('faculty@eduspire.edu', 'faculty123')}>
                👨‍🏫 Faculty
              </button>
              <button className="btn-clay-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => handleQuickLogin('admin@eduspire.edu', 'admin123')}>
                ⚙️ Admin
              </button>
              <button className="btn-clay-secondary" style={{ padding: '6px 12px', fontSize: '11px' }} onClick={() => handleQuickLogin('alumni@eduspire.edu', 'alumni123')}>
                🎓 Alumni
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
