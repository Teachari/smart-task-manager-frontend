import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';    // Import Auth hook
import { useTheme } from '../context/ThemeContext';  // Import Theme hook
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/tasks')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error connecting to backend database endpoints:", err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    logout(); // Resets global authentication data structure
    navigate('/login');
  };

  return (
    <div style={{
      backgroundColor: isDarkMode ? '#1a202c' : '#f7fafc',
      color: isDarkMode ? '#f7fafc' : '#1a202c',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <div className={styles.dashboardContainer}>
        <header className={styles.headerCard} style={{ backgroundColor: isDarkMode ? '#2d3748' : '#ffffff' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            <button onClick={toggleTheme} style={{
              padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer',
              backgroundColor: isDarkMode ? '#ecc94b' : '#4a5568', color: isDarkMode ? '#1a202c' : '#fff'
            }}>
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
          <div className={styles.titleWrapper}>
            <h1 className={styles.mainTitle} style={{ color: isDarkMode ? '#fff' : '#000' }}>Task Dashboard</h1>
            {user && <p style={{ color: '#007bff', fontWeight: 'bold', marginTop: '0.5rem' }}>Active Workspace: {user.email}</p>}
          </div>
          <p className={styles.subTitle}>Day 42: Global State Context Architecture Complete</p>
        </header>

        <main className={styles.taskList}>
          {loading ? (
            <p style={{ textAlign: 'center' }}>Connecting to backend database API...</p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => {
              const isTaskDone = task.completed === true || task.status?.toUpperCase() === 'COMPLETED';
              return (
                <div key={task.id || Math.random()} className={styles.taskCard} style={{ backgroundColor: isDarkMode ? '#2d3748' : '#fff' }}>
                  <div className={styles.taskInfo}>
                    <h3 style={{ color: isDarkMode ? '#fff' : '#2d3748' }}>{task.title || "Untitled Task"}</h3>
                    <p style={{ color: isDarkMode ? '#cbd5e0' : '#718096' }}>{task.description || "No description provided."}</p>
                  </div>
                  <div>
                    <span className={`${styles.badge} ${isTaskDone ? styles.completed : styles.pending}`}>
                      {task.status || (isTaskDone ? 'Completed' : 'Pending')}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: 'center' }}>No tasks found in your MySQL tables.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;