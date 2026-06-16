import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  // Safety check: if context isn't ready yet, show a loading message
  if (!auth || auth.loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Verifying session...</div>;
  }

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;