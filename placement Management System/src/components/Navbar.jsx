import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem("isLogin") === "true");
    } catch (e) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();
    } catch (e) {}
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav>
      <h2>Placement Management System</h2>
      {isLoggedIn && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
}

export default NavBar;


