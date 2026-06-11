import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Checks if the user has a valid 'true' status saved in browser memory
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // 🛡️ Guard Check: If not logged in, boot them out immediately
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If they are logged in, safely let them through to the page
  return children;
};

export default ProtectedRoute;