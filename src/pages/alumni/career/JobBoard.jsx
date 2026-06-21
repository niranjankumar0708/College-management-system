import React, { useState } from 'react';
import { Briefcase, Plus, UserCheck, DollarSign } from 'lucide-react';

export default function JobBoard() {
  const [jobs, setJobs] = useState([
    { id: 'JOB-01', title: 'Senior React Developer', company: 'Adobe Systems', exp: '3-5 years', package: '25 LPA', postedBy: 'Prabhu (2018 Batch)', link: 'adobe.com/careers' },
    { id: 'JOB-02', title: 'Data Scientist Intern', company: 'NVIDIA Bangalore', exp: 'Fresher / Final Year', package: '18 LPA', postedBy: 'Siddharth Sen (2022 Batch)', link: 'nvidia.com/careers' },
    { id: 'JOB-03', title: 'Systems Analyst', company: 'Goldman Sachs', exp: '1-3 years', package: '22 LPA', postedBy: 'Neha Sharma (2020 Batch)', link: 'gs.com/careers' },
  ]);

  const [formData, setFormData] = useState({ title: '', company: '', exp: '', package: '', link: '' });
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: 'JOB-0' + (jobs.length + 1),
      title: formData.title,
      company: formData.company,
      exp: formData.exp,
      package: formData.package,
      postedBy: 'Sanjay (You)',
      link: formData.link
    };
    setJobs([newJob, ...jobs]);
    setFormData({ title: '', company: '', exp: '', package: '', link: '' });
    setIsAdding(false);
  };

  return (
    <div className="page-container">
      <h2 className="section-title"><Briefcase color="var(--primary)" /> Alumni Referral & Job Board</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Post corporate referrals, explore alumni-exclusive vacancies, and bridge the industry-academy talent gap.</p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {!isAdding && (
          <button className="btn-primary" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Post Job Referral
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Configure Job Referral</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Job Title</label>
              <input type="text" className="glass-input" placeholder="e.g. Associate Product Manager" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Company</label>
              <input type="text" className="glass-input" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Experience Needed</label>
              <input type="text" className="glass-input" placeholder="e.g. 1-2 years" required value={formData.exp} onChange={(e) => setFormData({ ...formData, exp: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Package (CTC)</label>
              <input type="text" className="glass-input" placeholder="e.g. 15 LPA" required value={formData.package} onChange={(e) => setFormData({ ...formData, package: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Application URL / Email</label>
              <input type="text" className="glass-input" placeholder="e.g. company.com/apply" required value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>Publish</button>
              <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs Board Table */}
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Job Title & Company</th>
              <th>Experience Required</th>
              <th>Salary Package</th>
              <th>Posted By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.title}</p>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{job.company}</span>
                </td>
                <td>{job.exp}</td>
                <td>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <DollarSign size={13} /> {job.package}
                  </span>
                </td>
                <td><span style={{ fontSize: '13px' }}>{job.postedBy}</span></td>
                <td>
                  <a href={`https://${job.link}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', padding: '6px 12px', fontSize: '12px', display: 'inline-flex' }}>
                    Apply Vacancy
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
