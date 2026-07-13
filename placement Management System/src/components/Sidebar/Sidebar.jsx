import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/students">Student Details</Link></li>
        <li><Link to="/companies">Companies</Link></li>
        <li><Link to="/marks">Marks</Link></li>
        <li><Link to="/percentages">Percentages</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;