// src/components/Register/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (!userType) {
      setError('Por favor selecciona un tipo de cuenta');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }

    setIsLoading(true);
    
    // Simular registro
    setTimeout(() => {
      setIsLoading(false);
      register(email, userType);
      
      // Redirigir según el tipo de usuario
      navigate('/control-room');
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  const userTypes = [
    { id: 'supervisor', label: '👨‍💼 Supervisor', description: 'Acceso completo a todas las funciones' },
    { id: 'maintenance', label: '🔧 Mantenimiento', description: 'Dashboard de mantenimiento y activos' },
    { id: 'finance', label: '💰 Finanzas', description: 'Dashboard financiero y costos' }
  ];

  return (
    <div className="register-container">
      <div className="register-header">
        <h1>NISSAN</h1>
        <h2>Crear una cuenta</h2>
        <p className="register-subtitle">Selecciona el tipo de cuenta que necesitas</p>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="form-group">
          <label>Correo electrónico</label>
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

        <div className="form-row">
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Mínimo 6 caracteres"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError('');
              }}
              placeholder="Repite tu contraseña"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Tipo de cuenta</label>
          <div className="user-type-options">
            {userTypes.map((type) => (
              <div 
                key={type.id}
                className={`user-type-card ${userType === type.id ? 'selected' : ''}`}
                onClick={() => !isLoading && setUserType(type.id)}
              >
                <div className="user-type-icon">{type.label.split(' ')[0]}</div>
                <div className="user-type-info">
                  <h4>{type.label.split(' ').slice(1).join(' ')}</h4>
                  <p>{type.description}</p>
                </div>
                <div className="user-type-check">
                  {userType === type.id && '✓'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn-nissan register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creando cuenta...
              </>
            ) : 'Crear cuenta'}
          </button>

          <button 
            type="button" 
            className="back-button"
            onClick={handleBackToLogin}
            disabled={isLoading}
          >
            ← Volver al login
          </button>
        </div>

        <div className="register-info">
          <p><strong>Nota:</strong> Este es un sistema de demostración. En producción, las cuentas serían verificadas por el administrador del sistema.</p>
        </div>
      </form>
    </div>
  );
};

export default Register;