// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import ControlRoom from './components/ControlRoom/ControlRoom';
import DashboardSupervisor from './components/DashboardSupervisor/DashboardSupervisor';
import DashboardMaintenance from './components/DashboardMaintenance/DashboardMaintenance';
import DashboardFinance from './components/DashboardFinance/DashboardFinance';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Layout principal con sidebar
const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

// Componente de redirección basado en tipo de usuario
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }
  
  switch (user.type) {
    case 'maintenance':
      return <Navigate to="/maintenance" />;
    case 'finance':
      return <Navigate to="/finance" />;
    case 'supervisor':
    default:
      return <Navigate to="/dashboard" />;
  }
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<div className="login-page"><Login /></div>} />
          <Route path="/login" element={<Navigate to="/" />} />
          <Route path="/register" element={<div className="register-page"><Register /></div>} />
          
          {/* Rutas protegidas */}
          <Route path="/control-room" element={
            <ProtectedRoute>
              <MainLayout>
                <ControlRoom />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardSupervisor />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/maintenance" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardMaintenance />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/finance" element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardFinance />
              </MainLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirección por defecto */}
          <Route path="/redirect" element={<DashboardRedirect />} />
          
          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;