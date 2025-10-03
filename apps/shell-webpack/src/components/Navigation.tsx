import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalStore } from '../stores/globalStore';

const apps = [
  { path: '/login', name: 'Login', icon: '🔑' },
  { path: '/editor', name: 'Editor', icon: '✏️' },
  { path: '/user', name: 'User', icon: '👤' },
  { path: '/payment', name: 'Payment', icon: '💳' },
  { path: '/shop', name: 'Shop', icon: '🛒' },
  { path: '/thankyou', name: 'Thank You', icon: '🎉' },
  { path: '/share', name: 'Share', icon: '🔗' },
  { path: '/crm', name: 'CRM', icon: '📊' },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, setActiveApp, logout } = useGlobalStore();
  
  const handleLogout = () => {
    logout();
  };
  
  if (!isAuthenticated && !location.pathname.startsWith('/login')) {
    return (
      <nav className="navigation">
        <Link to="/login" className="nav-link">
          🔑 Login
        </Link>
      </nav>
    );
  }
  
  return (
    <nav className="navigation">
      {isAuthenticated && apps.map(app => (
        <Link
          key={app.path}
          to={app.path}
          className={`nav-link ${location.pathname.startsWith(app.path) ? 'active' : ''}`}
          onClick={() => setActiveApp(app.name)}
        >
          <span className="nav-icon">{app.icon}</span>
          <span className="nav-name">{app.name}</span>
        </Link>
      ))}
      {isAuthenticated && (
        <button className="nav-link logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          <span className="nav-name">Logout</span>
        </button>
      )}
    </nav>
  );
};

export default Navigation;
