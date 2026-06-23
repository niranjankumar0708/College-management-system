import React, { useState } from 'react';
import { FileText, Plus, Eye, Printer } from 'lucide-react';

export default function ResumeBuilder() {
  const [profile, setProfile] = useState({
    name: 'Sanjay',
    title: 'Frontend Developer & UI Designer',
    email: 'sanjay.h@eduspire.edu',
    phone: '+91 99887 76655',
    github: 'github.com/sanjay',
    summary: 'Enthusiastic computer science student with a strong passion for front-end architecture, interactive dashboards, and design systems.',
    skills: 'React.js, Javascript, CSS3, TailwindCSS, Vite, Node.js',
    experience: 'Software Intern at Tech Corp (Summer 2025)',
    project: 'College Management System Student Portal (React, Custom CSS)'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><FileText color="var(--primary)" /> Smart Resume Builder</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Draft and refine a professional, recruiter-ready resume. Preview formatting in real-time.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
        {/* Editor Form */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Resume Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</label>
              <input type="text" className="glass-input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Target Title</label>
              <input type="text" className="glass-input" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</label>
              <input type="text" className="glass-input" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Phone</label>
              <input type="text" className="glass-input" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>GitHub / Portfolio Link</label>
            <input type="text" className="glass-input" value={profile.github} onChange={(e) => setProfile({ ...profile, github: e.target.value })} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Professional Summary</label>
            <textarea className="glass-input" rows="3" value={profile.summary} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} style={{ resize: 'vertical' }}></textarea>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Technical Skills</label>
            <input type="text" className="glass-input" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Experience</label>
            <input type="text" className="glass-input" value={profile.experience} onChange={(e) => setProfile({ ...profile, experience: e.target.value })} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Key Project</label>
            <input type="text" className="glass-input" value={profile.project} onChange={(e) => setProfile({ ...profile, project: e.target.value })} />
          </div>
        </div>

        {/* Live Preview Panel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}><Eye size={18} /> Live Preview</h3>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', gap: '6px' }} onClick={handlePrint}>
              <Printer size={14} /> Export/Print
            </button>
          </div>

          <div id="resume-preview-area" style={{ background: '#ffffff', color: '#1f2937', padding: '30px', borderRadius: '8px', border: '1px solid var(--glass-border)', boxShadow: 'var(--card-shadow)', minHeight: '520px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>{profile.name}</h2>
              <p style={{ color: '#3b82f6', fontWeight: 600, fontSize: '14px', marginTop: '4px' }}>{profile.title}</p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280', marginTop: '8px' }}>
                <span>{profile.email}</span>
                <span>{profile.phone}</span>
                <span>{profile.github}</span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Summary</h4>
              <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{profile.summary}</p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Technical Skills</h4>
              <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{profile.skills}</p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Work Experience</h4>
              <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}><strong>{profile.experience}</strong></p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px', textTransform: 'uppercase', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>Academic Projects</h4>
              <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}><strong>{profile.project}</strong></p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview-area, #resume-preview-area * {
            visibility: visible;
          }
          #resume-preview-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
        }
      `}</style>
    </div>
  );
}
