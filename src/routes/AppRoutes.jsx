import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import TaskDetail from '../components/taskDetail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
