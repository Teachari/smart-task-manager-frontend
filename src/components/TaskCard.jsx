import React from 'react';

const TaskCard = ({ taskTitle, taskStatus }) => {
  // Gracefully reads boolean values from Spring Boot (true/false)
  const isCompleted = taskStatus === 'Completed' || taskStatus === true;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderLeft: isCompleted ? '6px solid #28a745' : '6px solid #ffc107',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', textAlign: 'left' }}>
        {taskTitle}
      </span>
      <span style={{
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        backgroundColor: isCompleted ? '#e2f0d9' : '#fff3cd',
        color: isCompleted ? '#2b5115' : '#856404'
      }}>
        {isCompleted ? 'Completed' : 'Pending'}
      </span>
    </div>
  );
};

export default TaskCard;