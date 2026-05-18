import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
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

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    const users = getUsers();
    const validUser = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password,
    );

    if (!validUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", loginData.email);
    navigate("/todo");
  };

  return (
    <Box >
      <Dialog open={true}>
        <Box sx={{ p: 2, bgcolor: "#f4f6f8" }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              width: 320,
              border: "1px solid #e2e8f0",
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
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>

            <Button component={Link} to="/signup" fullWidth sx={{ mt: 1 }}>
              Signup
            </Button>
          </Paper>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Login;
