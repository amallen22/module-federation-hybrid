import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useGlobalStore } from '../stores/globalStore';
import '../styles/layout.css';

export const Layout: React.FC = () => {
  const { user, isAuthenticated, notifications, removeNotification } = useGlobalStore();
  
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="header-title">CV Apps</h1>
            <Navigation />
          </div>
          {isAuthenticated && (
            <div className="header-right">
              <div className="user-info">
                <span className="user-name">👤 {user?.name}</span>
                <span className="user-role">{user?.role}</span>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="layout-content">
        <React.Suspense fallback={
          <div className="loading-fallback">
            <div className="spinner"></div>
            <p>Loading application...</p>
          </div>
        }>
          <Outlet />
        </React.Suspense>
      </main>
      
      {/* Global notifications */}
      {notifications.length > 0 && (
        <div className="notifications-container">
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification notification-${notification.type}`}
            >
              <span>{notification.message}</span>
              <button 
                className="notification-close"
                onClick={() => removeNotification(notification.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <footer className="layout-footer">
        <p>© 2025 CV Apps - Module Federation Architecture</p>
      </footer>
    </div>
  );
};

export default Layout;
