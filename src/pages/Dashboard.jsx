import React from 'react';
import TaskForm from '../components/taskForm';
import TaskList from '../components/taskList';
import TaskFilters from '../components/taskFilters';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
  return (
    <div>
        <Sidebar/>
        <h1>Task Management</h1>
        <TaskForm/>
        <TaskList/>
    </div>
  );
};

export default Dashboard;
