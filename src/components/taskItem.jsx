import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task }) => {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '15px',
        margin: '10px 0',
        borderRadius: '8px',
        backgroundColor: task.completed ? '#d4edda' : '#f8d7da',
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <Link to={`/tasks/${task.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        View Details
      </Link>
    </div>
  );
};

export default TaskItem;
