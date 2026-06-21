import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, RefreshCw, CheckCircle } from 'lucide-react';

export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowedBooks, setBorrowedBooks] = useState([
    { isbn: '978-0131103627', title: 'The C Programming Language', author: 'Kernighan & Ritchie', dueDate: '2026-06-25', status: 'Active' },
    { isbn: '978-0201633610', title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides', dueDate: '2026-06-18', status: 'Overdue' },
  ]);
  const [reservations, setReservations] = useState([
    { title: 'Introduction to Algorithms (CLRS)', status: 'Awaiting Pickup' }
  ]);
  const [renewSuccess, setRenewSuccess] = useState('');

  const booksDatabase = [
    { title: 'Clean Code', author: 'Robert C. Martin', available: true },
    { title: 'Compilers: Principles, Techniques, and Tools', author: 'Aho, Lam, Sethi, Ullman', available: false },
    { title: 'Database System Concepts', author: 'Silberschatz, Korth, Sudarshan', available: true },
    { title: 'Modern Operating Systems', author: 'Andrew S. Tanenbaum', available: true }
  ];

  const handleRenew = (isbn) => {
    setBorrowedBooks(borrowedBooks.map(book => {
      if (book.isbn === isbn) {
        // Extend due date by 14 days
        const current = new Date(book.dueDate);
        current.setDate(current.getDate() + 14);
        return {
          ...book,
          dueDate: current.toISOString().split('T')[0],
          status: 'Active' // Reset overdue status
        };
      }
      return book;
    }));
    setRenewSuccess('Renewal successful! New due date updated.');
    setTimeout(() => setRenewSuccess(''), 3000);
  };

  const handleReserve = (title) => {
    if (reservations.some(r => r.title === title)) return;
    setReservations([...reservations, { title, status: 'Confirmed' }]);
  };

  const searchResults = searchQuery
    ? booksDatabase.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="page-container">
      <h2 className="section-title"><BookOpen color="var(--primary)" /> Central Library Directory</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Reserve textbooks, monitor due dates, renew active borrows, and explore digital catalogues.</p>

      {renewSuccess && (
        <div className="badge badge-success" style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px' }}>
          {renewSuccess}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', flexWrap: 'wrap' }}>
        {/* Borrowed Books */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>My Active Borrows</h3>
            <div className="table-wrapper" style={{ margin: 0 }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Title & Author</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr key={book.isbn}>
                      <td>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{book.title}</p>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{book.author}</span>
                      </td>
                      <td>{book.dueDate}</td>
                      <td>
                        <span className={`badge ${book.status === 'Active' ? 'badge-success' : 'badge-error'}`}>
                          {book.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', gap: '4px' }} onClick={() => handleRenew(book.isbn)}>
                          <RefreshCw size={12} /> Renew
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card">
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>My Reservations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {reservations.map((res, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{res.title}</span>
                  <span className="badge badge-info">{res.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Search */}
        <div className="glass-card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>Book Lookup & Reservation</h3>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Search by title, author, subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          {searchQuery && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {searchResults.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', py: 10 }}>No matching books found in database.</p>
              ) : (
                searchResults.map((book, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 600 }}>{book.title}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{book.author}</p>
                    </div>
                    {book.available ? (
                      <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => handleReserve(book.title)}>
                        Reserve
                      </button>
                    ) : (
                      <span className="badge badge-error">Checked Out</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {!searchQuery && (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
              <Bookmark size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
              <p style={{ fontSize: '14px' }}>Type above to search from 200,000+ textbooks and journals.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
