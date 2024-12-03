import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTask } from '../features/taskSlice';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Icon,
} from '@mui/material';

// import { CheckCircle, RadioButtonUnchecked, Delete, Event } from '@mui/icons-material';
import { format, isBefore } from 'date-fns';
import { CheckCircle, RadioButtonUnchecked, Delete, Event } from '@mui/icons-material';
import TaskFilters from '../components/taskFilters'


const TaskList = () => {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState(null);

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) dispatch(deleteTask(taskToDelete.id));
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    if (filter === 'overdue') return isBefore(new Date(task.dueDate), new Date()) && !task.completed;
    return true;
  });

  return (
    <Box>
      <h1>Task List</h1>
      <TaskFilters/>
      <List>
        {filteredTasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              bgcolor: '#5c6dc9',
              borderRadius: 2,
              mb: 2,
              padding: 2,
              boxShadow: 1,
              '&:hover': { boxShadow: 3 },
            }}
          >
            {/* Task Details */}
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                >
                  {task.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {task.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Event fontSize="small" sx={{ mr: 1 }} />
                    Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </Typography>
                  {!task.completed && isBefore(new Date(task.dueDate), new Date()) && (
                    <Chip
                      label="Overdue"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </>
              }
            />

            {/* Task Actions */}
            <ListItemSecondaryAction>
              <Tooltip title={task.completed ? 'Mark as Pending' : 'Mark as Completed'}>
                <IconButton
                  edge="end"
                  color={task.completed ? 'success' : 'default'}
                  onClick={() => dispatch(toggleComplete(task.id))}
                >
                  {task.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                </IconButton>
                <span></span>
              </Tooltip>
              <Tooltip title="Delete Task">
                <IconButton edge="end" color="error" onClick={() => handleDeleteClick(task)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-task-dialog-title"
      >
        <DialogTitle id="delete-task-dialog-title">Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task{' '}
            <strong>{taskToDelete?.title}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskList;
