import {
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

import { useState } from "react";

function TodoItem({ todo, handleDelete, handleToggle, handleEdit }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editText, setEditText] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    handleDelete(todo.id);
    setOpen(false);
  };

  const handleEditOpen = () => {
    setEditText(todo.text);
    setEditOpen(true);
  };

  const handleEditClose = () => setEditOpen(false);

  const confirmEdit = () => {
    if (!editText.trim()) return;
    handleEdit(todo.id, editText);
    setEditOpen(false);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleEditOpen}
              sx={{
                textTransform: "none",
                boxShadow: "none",
                bgcolor: "#6366f1",
                "&:hover": { bgcolor: "#4f46e5" },
              }}
            >
              Edit
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleOpen}
              sx={{
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Delete
            </Button>
          </Box>
        }
      >
        <ListItemText
          primary={todo.text}
          onClick={() => handleToggle(todo.id)}
          sx={{
            cursor: "pointer",
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        />
      </ListItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            size="small"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button
            onClick={confirmEdit}
            variant="contained"
            sx={{ bgcolor: "#6366f1", "&:hover": { bgcolor: "#4f46e5" } }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TodoItem;