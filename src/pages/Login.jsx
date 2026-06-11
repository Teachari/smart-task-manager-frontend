import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 🌟 Targets your backend route perfectly now
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username,
        password
      });

      // If backend approves the login credentials
      if (response.data) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '100px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>🔐 Account Login</h2>
      {error && <p style={{ color: '#dc3545', fontSize: '14px' }}>⚠️ {error}</p>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '15px' }}
          required
        />
        <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;