import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Login from './components/Pages/Login/login';
import Register from './components/Registration/register';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const [isLogin, setLogin] = useState(() => {
    try {
      return localStorage.getItem('isLogin') === 'true';
    } catch (e) {
      return false;
    }
  });

  const RegistrationPage = () => {
    const [students, setStudents] = useState([]);

    const handleStudentRegistered = (student) => {
      setStudents((prev) => [...prev, student]);
      // Auto-login after registration
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login isLogin={isLogin} setLogin={setLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/dashboard"
          element={isLogin ? <Dashboard /> : <Navigate to="/register" replace />}
        />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  );
}

export default App;