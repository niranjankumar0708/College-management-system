import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Award, Tag } from 'lucide-react';

export default function EventCard({ event = {}, onRegister }) {
  const defaultEvent = {
    id: 'EVT-001',
    title: 'Eduspire Hackathon 2026',
    club: 'Google Developer Group',
    date: 'June 25, 2026',
    time: '09:00 AM - 09:00 PM',
    venue: 'Main Auditorium & CS Labs',
    category: 'Hackathon',
    prize: '₹50,000 cash pool + certificates',
    capacity: 200,
    registered: 142,
    status: 'Open',
  };

  const data = { ...defaultEvent, ...event };
  const [registered, setRegistered] = useState(false);
  const spotsLeft = data.capacity - (registered ? data.registered + 1 : data.registered);

  const handleReg = () => {
    setRegistered(!registered);
    if (onRegister) {
      onRegister(data.id, !registered);
    }
  };

  const categoryColor = () => {
    switch (data.category.toLowerCase()) {
      case 'hackathon': return 'badge-success';
      case 'fest': return 'badge-warning';
      case 'seminar': return 'badge-info';
      default: return 'badge-info';
    }
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <span className={`badge ${categoryColor()}`}>{data.category}</span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Tag size={12} /> {data.club}
        </span>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{data.title}</h3>
      
      {data.prize && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--warning)', fontSize: '13px', marginBottom: '16px', background: 'rgba(245, 158, 11, 0.05)', padding: '6px 12px', borderRadius: '8px' }}>
          <Award size={15} />
          <span><strong>Prize:</strong> {data.prize}</span>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={14} color="var(--primary)" />
          <span>{data.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} color="var(--primary)" />
          <span>{data.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={14} color="var(--primary)" />
          <span>{data.venue}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={14} color="var(--primary)" />
          <span>{spotsLeft} spots remaining (Capacity: {data.capacity})</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: registered ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 600 }}>
          {registered ? '✓ You are registered' : 'Not registered yet'}
        </span>
        <button 
          onClick={handleReg}
          className={registered ? 'btn-secondary' : 'btn-primary'}
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          {registered ? 'Withdraw' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}
