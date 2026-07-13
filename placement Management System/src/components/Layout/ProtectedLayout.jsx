import Sidebar from '../Sidebar/Sidebar';

function ProtectedLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-area">{children}</div>
    </div>
  );
}

export default ProtectedLayout;
