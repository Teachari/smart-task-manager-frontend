import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Clicking or opening the app takes you to Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Route: Locked behind our guard checkpoint */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Wildcard Fallback: Catches any broken URLs and displays a 404 page */}
        <Route
          path="*"
          element = {
            <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
              <h2>⚠️ Page Not Found (404)</h2>
              <p>The routing system cannot find this specific link path.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;