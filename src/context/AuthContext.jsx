import React, { createContext, useState, useContext } from 'react';

// 1. Initialize the Authentication Context channel
const AuthContext = createContext(null);

// 2. Build the Provider wrapper that holds session state memory
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (email) => {
    setIsAuthenticated(true);
    setUser({ email, role: 'developer' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create the custom useAuth hook for easy access in other files
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};