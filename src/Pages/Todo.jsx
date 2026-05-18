import React from "react";
import { useState, useEffect } from "react";

import {
  Box,
  Button,
  List,
  Paper,
  TextField,
  Typography,
  Container,
  Stack,
  Chip,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import Navbar from "../components/Navbar";
import TodoItem from "../components/TodoItem";
import { getTodos, saveTodos } from "../localStorage";

const Todo = () => {
  const currentUser = localStorage.getItem("currentUser");

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const allTodos = getTodos();

    setTodos(allTodos[currentUser] || []);
  }, [currentUser]);

  const handleAddTodo = () => {
    if (!task) return;
     console.log("currentUser:", currentUser); // should NOT be null
  console.log("todos before save:", getTodos());

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    const allTodos = getTodos();
    allTodos[currentUser] = updatedTodos;
    saveTodos(allTodos);

    setTask("");
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    const allTodos = getTodos();
    allTodos[currentUser] = updatedTodos;
    saveTodos(allTodos);
  };

  const handleToggle = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);

    const allTodos = getTodos();
    allTodos[currentUser] = updatedTodos;

    console.log("currentUser:", currentUser);

    saveTodos(allTodos);
  };

  const completedTasks = todos.filter(
    (todo) => todo.completed,
  ).length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
      }}
    >
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 5,
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            bgcolor: "#ffffff",
          }}
        >
          
          <Box mb={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#0f172a",
                mb: 1,
              }}
            >
              Todo Dashboard
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#64748b",
              }}
            >
              Manage your daily tasks efficiently
            </Typography>
          </Box>

          
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mb: 4,
              flexWrap: "wrap",
            }}
          >
            <Chip
              label={`Total Tasks: ${todos.length}`}
              sx={{
                bgcolor: "#e0e7ff",
                color: "#4338ca",
                fontWeight: 600,
                borderRadius: 2,
              }}
            />

            <Chip
              icon={<TaskAltIcon />}
              label={`Completed: ${completedTasks}`}
              sx={{
                bgcolor: "#dcfce7",
                color: "#166534",
                fontWeight: 600,
                borderRadius: 2,
              }}
            />
          </Stack>

          
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <TextField
              fullWidth
              label="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAddTodo}
              sx={{
                px: 3,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 600,
                bgcolor: "#6366f1",
                minWidth: "150px",
                boxShadow: "none",
                transition: "all 0.2s ease",

                "&:hover": {
                  bgcolor: "#4f46e5",
                  boxShadow:
                    "0 8px 20px rgba(99,102,241,0.3)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              Add Task
            </Button>
          </Box>

          
          {todos.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                py: 6,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#f8fafc",
                border: "1px dashed #cbd5e1",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#64748b",
                  mb: 1,
                }}
              >
                No tasks yet
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#94a3b8",
                }}
              >
                Add your first task to get started
              </Typography>
            </Paper>
          ) : (
            <List sx={{ p: 0 }}>
              <Stack spacing={2}>
                {todos.map((todo) => (
                  <Paper
                    key={todo.id}
                    elevation={0}
                    sx={{
                      borderRadius: 4,
                      border: "1px solid #e2e8f0",
                      transition: "all 0.2s ease",
                      overflow: "hidden",

                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 8px 20px rgba(0,0,0,0.06)",
                      },
                    }}
                  >
                    <TodoItem
                      todo={todo}
                      handleDelete={handleDelete}
                      handleToggle={handleToggle}
                    />
                  </Paper>
                ))}
              </Stack>
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Todo;
