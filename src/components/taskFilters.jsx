import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/taskSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector(state => state.tasks);

  return (
    <div style={{
        margin:'10px',
        padding: '10px'
     }} >
      <button
        onClick={() => dispatch(setFilter('all'))}
        className={filter === 'all' ? 'active' : ''}
      >
        All Tasks
      </button>
      <button
        onClick={() => dispatch(setFilter('completed'))}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
      <button
        onClick={() => dispatch(setFilter('pending'))}
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending
      </button>
      <button
        onClick={() => dispatch(setFilter('overdue'))}
        className={filter === 'overdue' ? 'active' : ''}
      >
        Overdue
      </button>
    </div>
  );
};

export default TaskFilters;
