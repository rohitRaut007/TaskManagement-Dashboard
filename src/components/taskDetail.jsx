import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Chip, Paper } from "@mui/material";
import { format, isBefore } from "date-fns";

const TaskDetail = () => {
  const { id } = useParams();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === parseInt(id)));

  if (!task) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#f8d7da",
          color: "#721c24",
        }}
      >
        <Typography variant="h4">Task not found</Typography>
      </Box>
    );
  }

  // Determine background image based on task status
  const backgroundImage =
    task.completed
      ? "https://source.unsplash.com/1600x900/?success" // Image for completed tasks
      : isBefore(new Date(task.dueDate), new Date())
      ? "https://source.unsplash.com/1600x900/?deadline,stress" // Image for overdue tasks
      : "https://source.unsplash.com/1600x900/?focus,inspiration"; // Image for pending tasks

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${backgroundImage}) no-repeat center center / cover`,
        color: "#808080",
        padding: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color:'wheat' ,fontWeight: "bold", textAlign: "center" }}>
          {task.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{  color:'wheat',marginBottom: 2, fontSize: 18, textAlign: "justify" }}
        >
          {task.description}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{  color:'wheat',fontSize: 16, marginBottom: 2 }}>
          Due Date: <strong>{format(new Date(task.dueDate), "MMM dd, yyyy")}</strong>
        </Typography>
        {task.completed && (
          <Chip
            label="Completed"
            color="success"
            sx={{ display: "block", margin: "10px auto" }}
          />
        )}
        {!task.completed && isBefore(new Date(task.dueDate), new Date()) && (
          <Chip
            label="Overdue"
            color="error"
            sx={{ display: "block", margin: "10px auto" }}
          />
        )}
        {!task.completed && !isBefore(new Date(task.dueDate), new Date()) && (
          <Chip
            label="Pending"
            color="warning"
            sx={{ display: "block", margin: "10px auto" }}
          />
        )}
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            fontWeight: "bold",
            textAlign: "center",
            color: task.completed ? "green" : isBefore(new Date(task.dueDate), new Date()) ? "red" : "orange",
          }}
        >
          Status: {task.completed ? "Completed" : isBefore(new Date(task.dueDate), new Date()) ? "Overdue" : "Pending"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default TaskDetail;
