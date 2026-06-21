import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, User, Settings, LogOut, CheckCircle2,
  CreditCard, History, Compass, CalendarRange, Sparkles, Home, BookOpen, Briefcase, FileText,
  Landmark, Activity, Users, CalendarCheck, RefreshCw, MessageSquare
} from 'lucide-react';

import Login from './pages/Login';

// Student Pages
import FeePayments from './pages/student/finance/FeePayments';
import PaymentHistory from './pages/student/finance/PaymentHistory';
import ClubsSocieties from './pages/student/campus-life/ClubsSocieties';
import EventCalendar from './pages/student/campus-life/EventCalendar';
import MyMemberships from './pages/student/campus-life/MyMemberships';
import HostelDorms from './pages/student/services/HostelDorms';
import Library from './pages/student/services/Library';
import Placements from './pages/student/career/Placements';
import ResumeBuilder from './pages/student/career/ResumeBuilder';

// Parent Pages
import DuesOverview from './pages/parent/finance/DuesOverview';
import PayFees from './pages/parent/finance/PayFees';
import WardActivities from './pages/parent/tracking/WardActivities';

// Faculty Pages
import ClubAdvising from './pages/faculty/campus-life/ClubAdvising';
import EventApprovals from './pages/faculty/campus-life/EventApprovals';

// Admin Pages
import FeeStructures from './pages/admin/finance/FeeStructures';
import Reconciliation from './pages/admin/finance/Reconciliation';
import Payroll from './pages/admin/finance/Payroll';
import ClubManagement from './pages/admin/campus-operations/ClubManagement';
import HostelManagement from './pages/admin/campus-operations/HostelManagement';
import Transport from './pages/admin/campus-operations/Transport';
import CompanyDrives from './pages/admin/placements/CompanyDrives';

// Alumni Pages
import GiveBack from './pages/alumni/engagement/GiveBack';
import MentorClubs from './pages/alumni/engagement/MentorClubs';
import JobBoard from './pages/alumni/career/JobBoard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('student'); // 'student' | 'parent' | 'faculty' | 'admin' | 'alumni'
  const [activePage, setActivePage] = useState('finance/payments');

  // Shared Global Mock Database
  const [transactions, setTransactions] = useState([
    { id: 'TXN4931894101', date: '2026-06-20', name: 'Hostel & Mess Charges', amount: 45000, status: 'SUCCESS', method: 'CARD (Ending 4444)' }
  ]);

  const [memberships, setMemberships] = useState([
    { clubName: 'Google Developer Group', role: 'Executive Member', status: 'Active', joinedDate: '2025-09-10' }
  ]);

  const [parentFees, setParentFees] = useState([
    { id: 'pt-tuition', name: 'Tuition Fee (IV Sem)', amount: 75000, deadline: '2026-07-15', status: 'Pending' },
    { id: 'pt-exam', name: 'Exam Fee (IV Sem)', amount: 2500, deadline: '2026-06-30', status: 'Pending' },
    { id: 'pt-hostel', name: 'Hostel & Mess Charges', amount: 45000, deadline: '2026-07-01', status: 'Paid' },
  ]);

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Sync route path when switching roles or logging in
  useEffect(() => {
    if (role === 'student') setActivePage('finance/payments');
    else if (role === 'parent') setActivePage('finance/overview');
    else if (role === 'faculty') setActivePage('campus-life/advising');
    else if (role === 'admin') setActivePage('finance/fee-structures');
    else if (role === 'alumni') setActivePage('engagement/giveback');
  }, [role, isAuthenticated]);

  // Helper callbacks
  const addTransaction = (txn) => setTransactions([txn, ...transactions]);
  const addMembership = (mem) => setMemberships([mem, ...memberships]);

  const handleParentPaymentSuccess = (feeId, txn) => {
    setParentFees(parentFees.map(f => f.id === feeId ? { ...f, status: 'Paid' } : f));
    addTransaction({
      id: txn.id,
      date: txn.date,
      name: parentFees.find(f => f.id === feeId)?.name || 'Fees',
      amount: txn.amount,
      status: 'SUCCESS',
      method: txn.method
    });
  };

  // Profiles based on active role
  const profileDetails = {
    student: { name: 'Sanjay', sub: 'Roll: 2023CSE0145', label: 'Student Workspace' },
    parent: { name: 'Prabhu', sub: 'Ward: Sanjay', label: 'Parent Gateway' },
    faculty: { name: 'Dr. Sarah Joseph', sub: 'Professor (CSE)', label: 'Faculty Hub' },
    admin: { name: 'Super Admin Office', sub: 'Administrator', label: 'Command Center' },
    alumni: { name: 'Siddharth Sen', sub: 'Batch of 2022', label: 'Alumni Network' },
  };

  // Navigations matching Role
  const roleNavItems = {
    student: [
      { id: 'finance/payments', label: 'Fee Payments', icon: CreditCard },
      { id: 'finance/history', label: 'Payment History', icon: History },
      { id: 'campus-life/clubs', label: 'Clubs & Societies', icon: Compass },
      { id: 'campus-life/calendar', label: 'Event Calendar', icon: CalendarRange },
      { id: 'campus-life/memberships', label: 'My Memberships', icon: Sparkles },
      { id: 'services/hostel', label: 'Hostel & Dorms', icon: Home },
      { id: 'services/library', label: 'Library Desk', icon: BookOpen },
      { id: 'career/placements', label: 'Placements', icon: Briefcase },
      { id: 'career/resume', label: 'Resume Builder', icon: FileText },
    ],
    parent: [
      { id: 'finance/overview', label: 'Dues Overview', icon: Landmark },
      { id: 'finance/pay', label: 'Pay Fees Portal', icon: CreditCard },
      { id: 'tracking/activities', label: 'Ward Activities', icon: Activity },
    ],
    faculty: [
      { id: 'campus-life/advising', label: 'Club Advising', icon: Users },
      { id: 'campus-life/approvals', label: 'Event Approvals', icon: CalendarCheck },
    ],
    admin: [
      { id: 'finance/fee-structures', label: 'Fee Structures', icon: Settings },
      { id: 'finance/reconciliation', label: 'Reconciliation', icon: RefreshCw },
      { id: 'finance/payroll', label: 'Payroll Payouts', icon: Landmark },
      { id: 'campus-operations/club-management', label: 'Club Setup', icon: Compass },
      { id: 'campus-operations/hostel-management', label: 'Hostel Allocation', icon: Home },
      { id: 'campus-operations/transport', label: 'Bus Routes', icon: Home },
      { id: 'placements/company-drives', label: 'Company Drives', icon: Briefcase },
    ],
    alumni: [
      { id: 'engagement/giveback', label: 'Give Back Gateway', icon: Landmark },
      { id: 'engagement/mentor', label: 'Mentor Clubs', icon: MessageSquare },
      { id: 'career/jobboard', label: 'Alumni Job Board', icon: Briefcase },
    ]
  };

  // Page Routing Renderer
  const renderPage = () => {
    switch (role) {
      case 'student':
        switch (activePage) {
          case 'finance/payments': return <FeePayments addTransaction={addTransaction} />;
          case 'finance/history': return <PaymentHistory transactions={transactions} />;
          case 'campus-life/clubs': return <ClubsSocieties memberships={memberships} addMembership={addMembership} />;
          case 'campus-life/calendar': return <EventCalendar />;
          case 'campus-life/memberships': return <MyMemberships memberships={memberships} />;
          case 'services/hostel': return <HostelDorms />;
          case 'services/library': return <Library />;
          case 'career/placements': return <Placements />;
          case 'career/resume': return <ResumeBuilder />;
          default: return <FeePayments addTransaction={addTransaction} />;
        }
      case 'parent':
        switch (activePage) {
          case 'finance/overview': return <DuesOverview parentFees={parentFees} navigateToPay={() => setActivePage('finance/pay')} />;
          case 'finance/pay': return <PayFees parentFees={parentFees} onPaymentSuccess={handleParentPaymentSuccess} />;
          case 'tracking/activities': return <WardActivities />;
          default: return <DuesOverview parentFees={parentFees} navigateToPay={() => setActivePage('finance/pay')} />;
        }
      case 'faculty':
        switch (activePage) {
          case 'campus-life/advising': return <ClubAdvising />;
          case 'campus-life/approvals': return <EventApprovals />;
          default: return <ClubAdvising />;
        }
      case 'admin':
        switch (activePage) {
          case 'finance/fee-structures': return <FeeStructures />;
          case 'finance/reconciliation': return <Reconciliation />;
          case 'finance/payroll': return <Payroll />;
          case 'campus-operations/club-management': return <ClubManagement />;
          case 'campus-operations/hostel-management': return <HostelManagement />;
          case 'campus-operations/transport': return <Transport />;
          case 'placements/company-drives': return <CompanyDrives />;
          default: return <FeeStructures />;
        }
      case 'alumni':
        switch (activePage) {
          case 'engagement/giveback': return <GiveBack />;
          case 'engagement/mentor': return <MentorClubs />;
          case 'career/jobboard': return <JobBoard />;
          default: return <GiveBack />;
        }
      default:
        return <FeePayments addTransaction={addTransaction} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', padding: '24px', gap: '24px' }}>
      
      {/* SPATIAL SIDEBAR */}
      <aside className="spatial-sidebar" style={{ 
        width: 'var(--sidebar-width)', 
        position: 'fixed', 
        top: '24px', 
        left: '24px', 
        bottom: '24px', 
        zIndex: 50,
        display: 'flex', 
        flexDirection: 'column',
        padding: '30px 24px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, var(--primary-light), var(--primary))', 
            padding: '10px', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#ffffff',
            boxShadow: 'var(--clay-button-shadow)'
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, tracking: '-0.02em' }}>EDUSPIRE</h1>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>ERP SYSTEM</span>
          </div>
        </div>

        {/* Dynamic Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, overflowY: 'auto', paddingRight: '4px' }}>
          {roleNavItems[role].map((item) => {
            const Icon = item.icon;
            const active = activePage === item.id;
            return (
              <button 
                key={item.id} 
                className="btn-clay-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 18px',
                  border: '1px solid rgba(255,255,255,0.7)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  justifyContent: 'flex-start',
                  boxShadow: active ? 'inset 2px 2px 4px rgba(255, 255, 255, 0.8), inset -2px -2px 4px rgba(79, 70, 229, 0.08), 2px 2px 8px rgba(79, 70, 229, 0.15)' : 'none',
                  background: active ? 'rgba(79, 70, 229, 0.06)' : '#ffffff',
                  color: active ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: active ? 700 : 500,
                  transform: active ? 'scale(1.02)' : 'none'
                }}
                onClick={() => setActivePage(item.id)}
              >
                <Icon size={18} color={active ? 'var(--primary)' : 'var(--text-secondary)'} />
                <span style={{ fontSize: '14px' }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile Card & Logout */}
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '20px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: '#f1f5f9', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: 'var(--clay-input-shadow)'
            }}>
              <User size={18} color="var(--primary)" />
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{profileDetails[role].name}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{profileDetails[role].sub}</p>
            </div>
          </div>

          <button 
            className="btn-clay-secondary" 
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              gap: '8px', 
              color: 'var(--error)', 
              borderColor: 'rgba(239, 68, 68, 0.2)',
              background: '#fef2f2',
              padding: '10px 16px',
              fontSize: '13px'
            }}
            onClick={handleLogout}
          >
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* SPATIAL CONTENT WRAPPER */}
      <div style={{ 
        marginLeft: 'calc(var(--sidebar-width) + 24px)', 
        flexGrow: 1, 
        minHeight: 'calc(100vh - 48px)', 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        {/* SPATIAL HEADER */}
        <header className="clay-card spatial-layer-1" style={{
          height: 'var(--header-height)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 32px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{profileDetails[role].label}</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Eduspire Academic Portal & ERP</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="badge badge-success" style={{ fontWeight: 700, gap: '6px' }}>
              <CheckCircle2 size={13} /> Secure Session Verified
            </span>
          </div>
        </header>

        {/* DYNAMIC PAGE PANEL */}
        <main className="clay-card spatial-layer-1" style={{ flexGrow: 1, padding: '40px' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
