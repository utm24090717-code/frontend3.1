// src/components/Login/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);
    
    // Simular petición al servidor
    setTimeout(() => {
      setIsLoading(false);
      
      // Simular diferentes tipos de usuario según el email
      let userType = 'supervisor';
      if (email.includes('mantenimiento')) userType = 'maintenance';
      if (email.includes('finanzas')) userType = 'finance';
      
      login(email, userType);
      navigate('/control-room');
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Se enviarán instrucciones para recuperar tu contraseña');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>NISSAN</h1>
        <h2>BIENVENIDO</h2>
        <p className="login-subtitle">Sistema de Gestión de Producción</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="form-group">
          <label>Ingresa tu dirección e-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="usuario@nissan.com"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Ingresa tu contraseña"
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-nissan login-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Iniciando sesión...
            </>
          ) : 'Iniciar sesión'}
        </button>

        <div className="login-links">
          <button 
            type="button" 
            className="link-button"
            onClick={handleForgotPassword}
            disabled={isLoading}
          >
            ¿Olvidaste tu contraseña?
          </button>
          
          <div className="register-prompt">
            <span>¿No tienes una cuenta?</span>
            <button 
              type="button" 
              className="link-button"
              onClick={handleRegister}
              disabled={isLoading}
            >
              Crear una cuenta
            </button>
          </div>
        </div>

        <div className="demo-info">
          <p>Para demo, usa cualquier correo con dominio @nissan.com</p>
          <p>Ejemplo: supervisor@nissan.com</p>
        </div>
      </form>
    </div>
  );
};

export default Login;