import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [], // List of tasks
  filter: 'all', // Current filter (e.g., all, completed, pending, overdue)
  searchQuery: '', // Search query for filtering tasks by title
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    // Edit an existing task
    editTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index >= 0) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    // Toggle the completion status of a task
    toggleComplete: (state, action) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    // Set the filter for tasks (e.g., all, completed, pending, overdue)
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Set the search query for filtering tasks
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.toLowerCase(); // Convert to lowercase for case-insensitive search
    },
  },
});

export const { 
  addTask, 
  editTask, 
  deleteTask, 
  toggleComplete, 
  setFilter, 
  setSearchQuery 
} = tasksSlice.actions;

export default tasksSlice.reducer;
