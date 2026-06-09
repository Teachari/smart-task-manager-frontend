import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TaskCard from './components/TaskCard'

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Pings your local Spring Boot server's port 8080 endpoint mapping
    axios.get('http://localhost:8080/tasks')
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Using offline placeholder fallback layout mode.", err);
        setError("Could not link to backend server. Viewing offline cache mode.");

        // Frontend local backup state array if your backend is toggled off
        setTasks([
          { id: 1, title: "Configure Spring Boot Security Backend", status: true },
          { id: 2, title: "Connect React Frontend Framework UI", status: false },
          { id: 3, title: "Synchronize PostgreSQL Database Tables", status: false }
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#1a1a1a', textAlign: 'left' }}>🛠️ Smart Task Manager</h1>
      <p style={{ color: '#666', textAlign: 'left' }}>Day 38: Deployed Live HTTP Fetch Architecture</p>

      <hr style={{ border: '0', height: '1px', background: '#ccc', margin: '20px 0' }} />

      <div style={{ maxWidth: '500px' }}>
        <h3 style={{ textAlign: 'left', color: '#333' }}>Your Assignments</h3>

        {loading && <p style={{ color: '#007bff' }}>Connecting to data pipeline...</p>}
        {error && <p style={{ color: '#dc3545', backgroundColor: '#fcd3d3', padding: '10px', borderRadius: '4px', textAlign: 'left' }}>⚠️ {error}</p>}

        {!loading && tasks.map((task) => (
          <TaskCard
            key={task.id}
            taskTitle={task.title}
            taskStatus={task.status}
          />
        ))}
      </div>
    </div>
  )
}

export default App