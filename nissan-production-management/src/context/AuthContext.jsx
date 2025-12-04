import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario desde localStorage
    const storedUser = localStorage.getItem('nissan_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('nissan_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, userType) => {
    const userData = {
      email,
      type: userType,
      name: email.split('@')[0].replace('.', ' '),
      timestamp: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('nissan_user', JSON.stringify(userData));
  };

  const register = (email, userType) => {
    const userData = {
      email,
      type: userType,
      name: email.split('@')[0].replace('.', ' '),
      timestamp: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem('nissan_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nissan_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};