import { ListItem, ListItemText, Button } from "@mui/material";

function TodoItem({ todo, handleDelete, handleToggle }) {
  return (
    <ListItem
      secondaryAction={
        <Button color="error" onClick={() => handleDelete(todo.id)} variant="contained">
          Delete
        </Button>
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
  );
}

export default TodoItem;
