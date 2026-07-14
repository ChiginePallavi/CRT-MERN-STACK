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
      const parsedStudents = Array.isArray(storedStudents) ? storedStudents : [];
      setTotalStudents(parsedStudents.length);

      const storedPlacedStudents = Number(localStorage.getItem('placedStudents'));
      if (!Number.isNaN(storedPlacedStudents) && storedPlacedStudents >= 0) {
        setPlacedStudents(storedPlacedStudents);
      }

      const storedCompanies = Number(localStorage.getItem('companies'));
      if (!Number.isNaN(storedCompanies) && storedCompanies >= 0) {
        setCompanies(storedCompanies);
      }

      const storedPendingStudents = Number(localStorage.getItem('pendingStudents'));
      if (!Number.isNaN(storedPendingStudents) && storedPendingStudents >= 0) {
        setPendingStudents(storedPendingStudents);
      }
    } catch (e) {
      setTotalStudents(0);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('placedStudents', String(placedStudents));
      localStorage.setItem('companies', String(companies));
      localStorage.setItem('pendingStudents', String(pendingStudents));
    } catch (e) {
      console.error('Unable to save dashboard stats', e);
    }
  }, [placedStudents, companies, pendingStudents]);

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
