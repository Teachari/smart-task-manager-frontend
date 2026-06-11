import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches items directly from your running Spring Boot backend server
    fetch('http://localhost:8080/api/v1/tasks')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Tasks Successfully:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        System.err.println("Error connecting to backend database endpoints:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.dashboardContainer}>

      {/* 🛠️ Modernized Responsive Header Layout */}
      <header className={styles.headerCard}>
        <button className={styles.logoutBtn} onClick={() => alert("Logging out safely...")}>Logout</button>
        <div className={styles.titleWrapper}>
          <h1 className={styles.mainTitle}>Task Dashboard</h1>
        </div>
        <p className={styles.subTitle}>Day 40: Scoped, Responsive Multi-Page Infrastructure</p>
      </header>

      {/* 📋 Dynamic Task Board Area */}
      <main className={styles.taskList}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#718096' }}>Connecting to database on port 8080...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => {
            // Safe fallback check: handles string evaluation or boolean evaluation uniformly
            const isTaskDone = task.completed === true || task.status?.toUpperCase() === 'COMPLETED';

            return (
              <div key={task.id || Math.random()} className={styles.taskCard}>
                <div className={styles.taskInfo}>
                  <h3>{task.title || "Untitled Task"}</h3>
                  <p>{task.description || "No description provided."}</p>
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
          <p style={{ textAlign: 'center', color: '#a0aec0' }}>No tasks found in your MySQL tables. Seed data initialization required.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;