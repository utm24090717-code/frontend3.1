import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/dashboard';
    
    switch (user.type) {
      case 'maintenance':
        return '/maintenance';
      case 'finance':
        return '/finance';
      case 'supervisor':
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <h2>NISSAN</h2>
          <p className="logo-subtitle">Production Dashboard</p>
        </div>
        
        {user && (
          <div className="user-info">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="user-details">
              <div className="user-name">{user.name || 'Usuario'}</div>
              <div className="user-role">{user.type || 'Supervisor'}</div>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">NAVEGACIÓN</h3>
          <NavLink 
            to="/control-room" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">🏭</span>
            <span className="nav-text">Sala de Control</span>
          </NavLink>
          
          <NavLink 
            to={getDashboardPath()} 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3 className="section-title">MÓDULOS</h3>
          <NavLink to="/orders" className="nav-link">
            <span className="nav-icon">📋</span>
            <span className="nav-text">Órdenes</span>
          </NavLink>
          <NavLink to="/quality" className="nav-link">
            <span className="nav-icon">✅</span>
            <span className="nav-text">Calidad</span>
          </NavLink>
          <NavLink to="/reports" className="nav-link">
            <span className="nav-icon">📈</span>
            <span className="nav-text">Reportes</span>
          </NavLink>
          <NavLink to="/maintenance" className="nav-link">
            <span className="nav-icon">🔧</span>
            <span className="nav-text">Mantenimiento</span>
          </NavLink>
          <NavLink to="/finance" className="nav-link">
            <span className="nav-icon">💰</span>
            <span className="nav-text">Finanzas</span>
          </NavLink>
        </div>

        <div className="nav-section">
          <h3 className="section-title">SISTEMA</h3>
          <NavLink to="/settings" className="nav-link">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Configuración</span>
          </NavLink>
          <button onClick={handleLogout} className="nav-link logout-btn">
            <span className="nav-icon">🚪</span>
            <span className="nav-text">Cerrar sesión</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="shift-info">
          <div className="shift-label">Turno activo</div>
          <div className="shift-value">TURNO 2 (12:00-20:00)</div>
        </div>
        <div className="system-status">
          <span className="status-indicator status-green"></span>
          <span>Sistema operativo</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;