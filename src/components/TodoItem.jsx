import {
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useState } from "react";

function TodoItem({ todo, handleDelete, handleToggle }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(todo.id);
    setOpen(false);
  };

  return (
    <>
      <ListItem
        secondaryAction={
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
        }
      >
        <ListItemText
          primary={todo.text}
          onClick={() => handleToggle(todo.id)}
          sx={{
            cursor: "pointer",
            textDecoration: todo.completed
              ? "line-through"
              : "none",
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
          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TodoItem;