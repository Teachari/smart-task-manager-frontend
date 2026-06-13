import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // 🌟 1. Import React Hook Form driver
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

const LoginCard = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🌟 2. Destructure tools from the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: 'admin@smarttask.com',
      password: ''
    }
  });

  // 🌟 3. Handle submission after validation passes
  const onFormSubmit = (data) => {
    console.log("Validation Passed! Form Data: ", data);

    if (data.email === 'admin@smarttask.com' || data.email === 'alex@smarttask.com') {
      login(data.email);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7fafc', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#2d3748' }}>🔒 Account Login</h2>
        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096', marginBottom: '1.5rem' }}>Day 43: React Hook Form Validation</p>

        {/* 🌟 4. Bind handleSubmit to standard onSubmit event */}
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>

          {/* --- EMAIL FIELD WITH VALIDATION --- */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '0.25rem' }}>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={{ width: '100%', padding: '0.75rem', border: errors.email ? '2px solid #e53e3e' : '1px solid #cbd5e0', borderRadius: '4px', boxSizing: 'border-box' }}
              // 🌟 5. Register with complex constraints
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email address structure.'
                }
              })}
            />
            {/* Display validation warning if checks fail */}
            {errors.email && <p style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 'bold' }}>⚠️ {errors.email.message}</p>}
          </div>

          {/* --- PASSWORD FIELD WITH VALIDATION --- */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 'bold', color: '#4a5568', marginBottom: '0.25rem' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{ width: '100%', padding: '0.75rem', border: errors.password ? '2px solid #e53e3e' : '1px solid #cbd5e0', borderRadius: '4px', boxSizing: 'border-box' }}
              // 🌟 6. Register with required and length constraints
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Security rule: Password must be at least 6 characters long.'
                }
              })}
            />
            {errors.password && <p style={{ color: '#e53e3e', fontSize: '0.75rem', marginTop: '0.25rem', fontWeight: 'bold' }}>⚠️ {errors.password.message}</p>}
          </div>

          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Secure Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginCard />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<div style={{ padding: '2rem' }}>404 Page Not Found</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;