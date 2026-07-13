import "./Navbar.css";

function NavBar({ isLogin, handleLogout }) {
  return (
    <nav>
      <h2>Placement Management System</h2>
      {isLogin && (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </nav>
  );
}

export default NavBar;


