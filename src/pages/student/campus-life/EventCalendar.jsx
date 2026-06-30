import React, { useState } from 'react';
import EventCard from '../../../components/campus-life/EventCard';
import { CalendarRange, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventCalendar() {
  const [selectedMonth, setSelectedMonth] = useState('June 2026');
  
  const events = [
    { id: 'EVT-101', title: 'National Level Tech Symposium', club: 'Computer Science Dept', date: 'June 22, 2026', time: '09:00 AM - 04:00 PM', venue: 'Convention Hall', category: 'Seminar', prize: '₹20,000 cash prize', capacity: 150, registered: 110 },
    { id: 'EVT-102', title: 'Chrysalis Cultural Fest 2026', club: 'Sargam Cultural Club', date: 'June 24, 2026', time: '10:00 AM - 10:00 PM', venue: 'Open Air Theatre', category: 'Fest', prize: 'Performance trophies', capacity: 500, registered: 320 },
    { id: 'EVT-103', title: 'IoT Prototyping Workshop', club: 'Robotics & Automation Club', date: 'June 28, 2026', time: '01:00 PM - 05:00 PM', venue: 'Robotics Lab', category: 'Seminar', prize: 'Take-home hardware kits', capacity: 50, registered: 42 },
  ];

  // Calendar dates mock
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="page-container">
      <h2 className="section-title"><CalendarRange color="var(--primary)" /> Event Calendar</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Browse upcoming hackathons, tech workshops, guest lectures, and cultural fests.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
        {/* Calendar Card */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{selectedMonth}</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-secondary" style={{ padding: '6px', borderRadius: '8px' }}><ChevronLeft size={16} /></button>
              <button className="btn-secondary" style={{ padding: '6px', borderRadius: '8px' }}><ChevronRight size={16} /></button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', textAlign: 'center', fontWeight: 600, fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
            {/* Empty boxes for calendar padding */}
            <span></span>
            {daysInMonth.map(day => {
              const hasEvent = day === 22 || day === 24 || day === 28;
              return (
                <div 
                  key={day} 
                  style={{ 
                    aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '14px', position: 'relative',
                    background: hasEvent ? 'rgba(var(--primary-rgb), 0.15)' : 'transparent',
                    borderColor: hasEvent ? 'var(--primary)' : 'var(--glass-border)',
                  }}
                >
                  <span style={{ fontWeight: hasEvent ? 700 : 400, color: hasEvent ? 'var(--primary)' : 'var(--text-primary)' }}>{day}</span>
                  {hasEvent && <span style={{ position: 'absolute', bottom: '4px', width: '4px', height: '4px', borderRadius: '50%', background: 'var(--primary)' }}></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>Events in June</h3>
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </div>
    </div>
  );
}
