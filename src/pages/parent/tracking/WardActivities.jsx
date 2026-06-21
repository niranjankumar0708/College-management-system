import React from 'react';
import { LineChart, BarChart } from 'lucide-react'; // Simulating graphs
import { Activity, Award, BookOpen, CheckSquare, Star } from 'lucide-react';

export default function WardActivities() {
  const courses = [
    { code: 'CS301', name: 'Database Management Systems', attendance: 88, status: 'Good' },
    { code: 'CS302', name: 'Design & Analysis of Algorithms', attendance: 94, status: 'Excellent' },
    { code: 'CS303', name: 'Operating Systems Lab', attendance: 100, status: 'Perfect' },
    { code: 'CS304', name: 'Computer Networks', attendance: 78, status: 'Average' },
  ];

  const clubs = [
    { name: 'Google Developer Group', role: 'Executive Member', status: 'Active' },
    { name: 'Robotics & Automation Club', role: 'Co-coordinator', status: 'Active' }
  ];

  return (
    <div className="page-container">
      <h2 className="section-title"><Activity color="var(--primary)" /> Ward Academic & Extra-curricular Tracker</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Monitor class attendance, course schedules, achievements, and club participation details of your ward.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
        {/* Class Attendance */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={18} color="var(--primary)" /> Class Attendance Log</h3>
          <div className="table-wrapper" style={{ margin: 0 }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Course Code & Title</th>
                  <th>Attendance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.code}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{course.name}</p>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{course.code}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, width: '60px', height: '6px', background: 'var(--glass-border)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${course.attendance}%`, height: '100%', background: course.attendance >= 90 ? 'var(--accent)' : 'var(--primary)' }}></div>
                        </div>
                        <span style={{ fontWeight: 600 }}>{course.attendance}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${
                        course.status === 'Perfect' ? 'badge-success' :
                        course.status === 'Excellent' ? 'badge-success' :
                        course.status === 'Good' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clubs & Achievements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Star size={18} color="var(--primary)" /> Active Club Memberships</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {clubs.map((club, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{club.name}</h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{club.role}</p>
                  </div>
                  <span className="badge badge-success">{club.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} color="var(--primary)" /> Academic & Co-curricular Badges</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <span className="badge badge-success" style={{ padding: '8px 12px' }}>🏆 Hackathon 1st Runner Up</span>
              <span className="badge badge-info" style={{ padding: '8px 12px' }}>⭐ 9.0+ Semester SGPA</span>
              <span className="badge badge-warning" style={{ padding: '8px 12px' }}>⚡ Tech Fest Coordinator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
