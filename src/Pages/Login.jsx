import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { getUsers } from "../localStorage";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
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
          width: 850,
          minHeight: 520,
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
          <Stack spacing={1} alignitems="center" mb={3}>
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

          {/* <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            onChange={handleChange}
          /> */}
          <TextField
            value={loginData.password}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={handleChange}
            // onBlur={handleBlur}
            error={Boolean(error.password)}
            helperText={error.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
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
              mb: 1,
            }}
          >
            Login
          </Button>

          {/* <Button
            component={Link}
            to="/signup"
            fullWidth
            sx={{ mt: 1, textTransform: "none" }}
          >
            Signup
          </Button> */}
          <Typography variant="body2" align="center" mt={2}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#6366f1", fontWeight: 500 }}>
              Signup
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
