import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const users = getUsers();
    const validUser = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (!validUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", loginData.email);
    navigate("/todo");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          width: 750,
          minHeight: 420,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        
        <Box
          sx={{
            flex: 1,
            bgcolor: "#6366f1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            p: 4,
          }}
        >
          <Box
            component="img"
            src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f4dd.svg"
            alt="Login illustration"
            sx={{ width: 100, opacity: 0.95 }}
          />
          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: 700, textAlign: "center" }}
          >
            Todo App
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.75)", textAlign: "center" }}
          >
            Manage your tasks efficiently
          </Typography>
        </Box>

        
        <Box
          sx={{
            flex: 1,
            p: 5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack spacing={1} alignItems="center" mb={3}>
            <LoginIcon sx={{ fontSize: 32, color: "#6366f1" }} />
            <Typography variant="h6" fontWeight={600}>
              Login
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your credentials
            </Typography>
          </Stack>

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            onChange={handleChange}
          />

          {error && (
            <Typography color="error" variant="body2" align="center" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              mt: 2,
              bgcolor: "#6366f1",
              "&:hover": { bgcolor: "#4f46e5" },
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/signup"
            fullWidth
            sx={{ mt: 1, textTransform: "none" }}
          >
            Signup
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
