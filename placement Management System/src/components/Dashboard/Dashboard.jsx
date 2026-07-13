import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [placedStudents, setPlacedStudents] = useState(50);
  const [companies, setCompanies] = useState(33);
  const [pendingStudents, setPendingStudents] = useState(40);

  useEffect(() => {
    try {
      const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
      setTotalStudents(storedStudents.length);
    } catch (e) {
      setTotalStudents(0);
    }
  }, []);

  function handleAddStudent() {
    navigate('/register');
  }

  function increasePlacedStudents() {
    setPlacedStudents((prev) => prev + 1);
  }

  function increaseCompanies() {
    setCompanies((prev) => prev + 1);
  }

  function increasePendingStudents() {
    setPendingStudents((prev) => prev + 1);
  }

  return (
    <div className="dashboard-content">
      <div className="dashboard">
        <h1>Welcome Back</h1>
        <div className="card">
          <h2>{totalStudents}</h2>
          <button type="button" onClick={handleAddStudent}>
            Add Student
          </button>
          <p>Total Students</p>
        </div>
        <div className="card">
          <h2>{placedStudents}</h2>
          <button type="button" onClick={increasePlacedStudents}>
            Add Placed Student
          </button>
          <p>Placed</p>
        </div>
        <div className="card">
          <h2>{companies}</h2>
          <button type="button" onClick={increaseCompanies}>
            Add Company
          </button>
          <p>Companies</p>
        </div>
        <div className="card">
          <h2>{pendingStudents}</h2>
          <button type="button" onClick={increasePendingStudents}>
            Add Pending Student
          </button>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;