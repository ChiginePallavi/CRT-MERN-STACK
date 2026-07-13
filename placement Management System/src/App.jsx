import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Pages/Login/login';
import Register from './components/Registration/register';
import Dashboard from './components/Dashboard/Dashboard';
import StudentPage from './components/student/studentdetails';
import Home from './components/Registration/Home';
import ProtectedLayout from './components/Layout/ProtectedLayout';
import NotFound from './components/NotFound/NotFound';
import Companies from './components/Companies/Companies';

function App() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(() => {
    try {
      return localStorage.getItem('isLogin') === 'true';
    } catch (e) {
      return false;
    }
  });

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
    const [students, setStudents] = useState([]);

    const handleStudentRegistered = (student) => {
      setStudents((prev) => {
        const nextStudents = [...prev, student];
        localStorage.setItem('students', JSON.stringify(nextStudents));
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