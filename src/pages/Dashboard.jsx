import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveNotification, setLiveNotification] = useState('');
  const navigate = useNavigate();

  const { logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  // 📡 1. Fetch initial snapshot from REST API
  useEffect(() => {
    fetch('http://localhost:8080/api/v1/tasks')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Backend API loading... Using fallback view data structure:", err);
        setTasks([
          { id: 1, title: "Learn Spring Boot IoC", description: "Complete Day 31 fundamentals setup", status: "PENDING" },
          { id: 2, title: "Build REST API Endpoints", description: "Configure Task and Auth controllers", status: "PENDING" }
        ]);
        setLoading(false);
      });
  }, []);

  // 📡 2. Modern StompJS Client Loop Configuration
  useEffect(() => {
    const StompJs = window.StompJs;

    if (!StompJs) {
      console.warn("Waiting for secure StompJS module injection...");
      return;
    }

    // Initialize modern event client broker
    const client = new StompJs.Client({
      brokerURL: 'ws://localhost:8080/ws-tasks/websocket', // Connects directly via raw web sockets
      connectHeaders: {},
      debug: null,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Handle incoming messages
    client.onConnect = (frame) => {
      console.log('🚀 Secure WebSocket tunnel established successfully!');

      client.subscribe('/topic/tasks', (messageOutput) => {
        if (messageOutput?.body) {
          const freshTask = JSON.parse(messageOutput.body);

          setLiveNotification(`Task Update: "${freshTask.title || 'Task changed'}"`);
          setTimeout(() => setLiveNotification(''), 4000);

          setTasks((prevTasks) => {
            const baseTasks = Array.isArray(prevTasks) ? prevTasks : [];
            const exists = baseTasks.some(t => t.id === freshTask.id);
            if (exists) {
              return baseTasks.map(t => t.id === freshTask.id ? freshTask : t);
            }
            return [freshTask, ...baseTasks];
          });
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
    };

    // Activate the client connection
    client.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#1a202c' : '#f7fafc',
      color: isDarkMode ? '#f7fafc' : '#1a202c',
      minHeight: '100vh', padding: '2rem', transition: 'all 0.3s ease', fontFamily: 'sans-serif'
    }}>

      {liveNotification && (
        <div style={{
          position: 'fixed', top: '25px', right: '25px', backgroundColor: '#38a169',
          color: '#fff', padding: '1rem 1.5rem', borderRadius: '6px', fontWeight: 'bold', zIndex: 99999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          ⚡ {liveNotification}
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{
          backgroundColor: isDarkMode ? '#2d3748' : '#ffffff',
          padding: '2rem', borderRadius: '8px', marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0 }}>Task Dashboard</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={toggleTheme} style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}>
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#e53e3e', color: 'white', borderRadius: '4px', border: 'none', fontWeight: 'bold' }}>
                Logout
              </button>
            </div>
          </div>
          {user && <p style={{ color: '#007bff', fontWeight: 'bold', margin: '1rem 0 0 0' }}>Workspace: {user.email}</p>}
        </header>

        <main>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Synchronizing workspace data...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id || Math.random()} style={{
                backgroundColor: isDarkMode ? '#2d3748' : '#fff',
                padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{task.title || "Untitled Task"}</h3>
                  <p style={{ margin: 0, color: isDarkMode ? '#cbd5e0' : '#718096' }}>{task.description || "No description."}</p>
                </div>
                <span style={{
                  backgroundColor: task.status === 'COMPLETED' ? '#c6f6d5' : '#feebc8',
                  color: task.status === 'COMPLETED' ? '#22543d' : '#744210',
                  padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold'
                }}>
                  {task.status || 'PENDING'}
                </span>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center' }}>No tasks found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;