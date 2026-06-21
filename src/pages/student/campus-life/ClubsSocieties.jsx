import React, { useState } from 'react';
import ClubRegistrationForm from '../../../components/campus-life/ClubRegistrationForm';
import { Compass, Users, CheckCircle } from 'lucide-react';

export default function ClubsSocieties({ memberships = [], addMembership }) {
  const [activeClub, setActiveClub] = useState(null);
  const [filter, setFilter] = useState('All');

  const clubs = [
    { name: 'Google Developer Group', desc: 'Exploring android, cloud, web, and machine learning tech stack.', category: 'Tech', members: 120 },
    { name: 'Sargam Cultural Club', desc: 'Music, theater, dance, and arts fest organizers.', category: 'Cultural', members: 85 },
    { name: 'Titans Sports Club', desc: 'Campus basketball, cricket, and athletics tournaments.', category: 'Sports', members: 150 },
    { name: 'Robotics & Automation', desc: 'Arduino, IoT prototyping, and robot combat setups.', category: 'Tech', members: 65 },
    { name: 'Literary Society', desc: 'Debates, poetry slams, and publication of annual magazine.', category: 'Cultural', members: 40 },
  ];

  const handleApply = (appData) => {
    addMembership({
      clubName: appData.clubName,
      role: 'Member',
      status: 'Pending Approval',
      joinedDate: appData.appliedDate
    });
    setTimeout(() => setActiveClub(null), 2000);
  };

  const filteredClubs = filter === 'All' ? clubs : clubs.filter(c => c.category === filter);

  return (
    <div className="page-container">
      <h2 className="section-title"><Compass color="var(--primary)" /> Clubs & Societies</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Browse tech, cultural, and athletic communities. Join clubs to foster networking and skill-building.</p>

      {activeClub ? (
        <ClubRegistrationForm 
          clubName={activeClub.name} 
          onSubmit={handleApply} 
          onCancel={() => setActiveClub(null)} 
        />
      ) : (
        <>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {['All', 'Tech', 'Cultural', 'Sports'].map(cat => (
              <button 
                key={cat} 
                className="btn-secondary" 
                style={{ 
                  padding: '8px 16px', fontSize: '13px', 
                  borderColor: filter === cat ? 'var(--primary)' : 'var(--glass-border)',
                  background: filter === cat ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent' 
                }}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="dashboard-grid">
            {filteredClubs.map((club, idx) => {
              const isMember = memberships.some(m => m.clubName === club.name);
              const membershipStatus = memberships.find(m => m.clubName === club.name)?.status;

              return (
                <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-info">{club.category}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Users size={12} /> {club.members} members
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{club.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', flexGrow: 1, marginBottom: '20px', lineHeight: 1.5 }}>{club.desc}</p>
                  
                  <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {isMember ? (
                      <span className="badge badge-success" style={{ textTransform: 'capitalize' }}>
                        {membershipStatus === 'Active' ? '✓ Joined' : '⚡ Pending Approval'}
                      </span>
                    ) : (
                      <>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Not a member</span>
                        <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }} onClick={() => setActiveClub(club)}>
                          Join Club
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
