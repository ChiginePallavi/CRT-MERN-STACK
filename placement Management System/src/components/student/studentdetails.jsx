import '../../App.css';
import './student.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('students');
      const arr = raw ? JSON.parse(raw) : [];
      setStudents(arr);
    } catch (e) {
      console.error('Failed to load students from localStorage', e);
    }
  }, []);

  const handleDelete = (index) => {
    const copy = [...students];
    copy.splice(index, 1);
    setStudents(copy);
    localStorage.setItem('students', JSON.stringify(copy));
  };

  const handleEdit = (student) => {
    if (!student) return;
    const studentId = student.id ?? student.roll;
    navigate(`/students/edit/${studentId}`);
  };

  const filtered = students.filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (s.name || '').toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      (s.roll || '').toString().toLowerCase().includes(q) ||
      (s.section || '').toLowerCase().includes(q) ||
      (s.year || '').toString().toLowerCase().includes(q) ||
      (s.cgp || '').toString().toLowerCase().includes(q)
    );
  });

  return (
    <div className="students-table-card">
      <h2>Students</h2>

      <div className="students-table-toolbar">
        <input
          className="students-search"
          placeholder="Search by name, email, roll, section..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search students"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="students-empty">No registered students match your search.</div>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll</th>
              <th>Section</th>
              <th>Year</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id ?? s.roll ?? i}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.roll}</td>
                <td>{s.section}</td>
                <td>{s.year}</td>
                <td>{s.cgp}</td>
                <td className="student-actions">
                  <button className="btn-view" onClick={() => alert(JSON.stringify(s, null, 2))}>View</button>
                  <button className="btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(i)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentPage;