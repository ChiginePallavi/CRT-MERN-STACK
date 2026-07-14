import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Pages/Login/login';
import Register from './components/Registration/register';
import Dashboard from './components/Dashboard/Dashboard';
import StudentPage from './components/student/studentdetails';
import Editstudents from './components/Pages/Editstudents/Editstudents';
import Home from './components/Registration/Home';
import ProtectedLayout from './components/Layout/ProtectedLayout';
import NotFound from './components/NotFound/NotFound';
import Companies from './components/Companies/Companies';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setLogin] = useState(() => {
    try {
      return localStorage.getItem('isLogin') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    setIsRouteLoading(true);
    const timer = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const handleLogout = () => {
    setLogin(false);
    try {
      localStorage.removeItem('isLogin');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.clear();
    } catch (e) {}
    navigate('/login');
  };

  const RegistrationPage = () => {
    const [students, setStudents] = useState(() => {
      try {
        const raw = localStorage.getItem('students');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    });

    const handleStudentRegistered = (student) => {
      setStudents((prev) => {
        const existing = Array.isArray(prev) ? prev : [];
        const nextStudents = [...existing, student];
        try {
          const stored = JSON.parse(localStorage.getItem('students') || '[]');
          const merged = Array.isArray(stored) ? [...stored, student] : [student];
          localStorage.setItem('students', JSON.stringify(merged));
        } catch (e) {
          localStorage.setItem('students', JSON.stringify(nextStudents));
        }
        return nextStudents;
      });
      localStorage.setItem('isLogin', 'true');
      setLogin(true);
    };

    return (
      <div className="register-container">
        <Register onStudentRegistered={handleStudentRegistered} setLogin={setLogin} />
      </div>
    );
  };

  return (
    <div>
      <Navbar isLogin={isLogin} handleLogout={handleLogout} />
      {isRouteLoading && (
        <div className="route-loading-overlay" aria-live="polite">
          <div className="route-loading-card">
            <div className="route-spinner" />
            <p>Loading page...</p>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login isLogin={isLogin} setLogin={setLogin} handleLogout={handleLogout} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/dashboard"
          element={isLogin ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/students"
          element={isLogin ? <ProtectedLayout><StudentPage /></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/students/edit/:id"
          element={isLogin ? <ProtectedLayout><Editstudents /></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/companies"
          element={isLogin ? <ProtectedLayout><Companies /></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/home"
          element={isLogin ? <ProtectedLayout><Home /></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/marks"
          element={isLogin ? <ProtectedLayout><div className="page-card"><h2>Marks</h2><p>Marks page coming soon.</p></div></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/percentages"
          element={isLogin ? <ProtectedLayout><div className="page-card"><h2>Percentages</h2><p>Percentages page coming soon.</p></div></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route
          path="/quiz"
          element={isLogin ? <ProtectedLayout><div className="page-card"><h2>Quiz</h2><p>Quiz page coming soon.</p></div></ProtectedLayout> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;