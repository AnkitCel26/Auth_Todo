import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, saveUser } from "../localStorage";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [pswdBar, setPswdBar] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await ValidateSignup.validateAt(name, formData);
      setError((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setError((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const ValidateSignup = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(
        /^[6-9]\d{9}$/,
        "Mobile number must be exactly 10 digits and start with 6-9",
      )
      .required("Mobile number is required"),

    password: Yup.string()
      .required("Password is required"),
      // .min(8, "Password must be at least 8 characters long")
      // .matches(
      //   /[!@#$%^&*(),.?":{}|<>]/,
      //   "Password must contain at least one special character",
      // )
      // .matches(
      //   /^(?=.*[A-Z]).+$/,
      //   "Password must contain at least one uppercase letter",
      // )
      // .matches(
      //   /^(?=.*[a-z]).+$/,
      //   "Password must contain at least one lowercase letter",
      // )
      // .matches(/^(?=.*[0-9]).+$/, "Password must contain at least one number"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handlePasswordCheck = (password) => {
    setPswdBar({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await ValidateSignup.validate(formData, { abortEarly: true });
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setError(newError);
      return;
    }

    const { name, email, password, mobile } = formData;

    const users = getUsers();
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError({ error: "User with this email already exists" });
      return;
    }

    users.push({ name, email, password, mobile });
    saveUser(users);

    setStatus("success");

    setTimeout(() => {
      navigate("/");
    }, 4000);
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
            alt="Signup illustration"
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
            bgcolor: "#fff",
            overflowY: "auto",
          }}
        >
          <Stack spacing={1} alignItems="center" mb={3}>
            <PersonAddAlt1Icon sx={{ fontSize: 32, color: "#6366f1" }} />
            <Typography variant="h6" fontWeight={600}>
              Signup
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create your account
            </Typography>
          </Stack>

          <TextField
            value={formData.name}
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(error.name)}
            helperText={error.name}
          />

          <TextField
            value={formData.email}
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(error.email)}
            helperText={error.email}
          />

          <TextField
            value={formData.mobile}
            label="Mobile"
            name="mobile"
            fullWidth
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(error.mobile)}
            helperText={error.mobile}
          />
          <TextField
            value={formData.password}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={(e) => {
              handleChange(e);
              handlePasswordCheck(e.target.value);
            }}
            onBlur={handleBlur}
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
          {formData.password.length > 0 &&
            !(
              pswdBar.length &&
              pswdBar.upper &&
              pswdBar.lower &&
              pswdBar.number &&
              pswdBar.symbol
            ) && (
              <Box sx={{ mt: 1 }}>
                <Typography
                  sx={{ color: pswdBar.length ? "green" : "#b71c1c" }}
                >
                  {pswdBar.length ? "✔" : "•"} At least 8 characters
                </Typography>

                <Typography sx={{ color: pswdBar.upper ? "green" : "#b71c1c" }}>
                  {pswdBar.upper ? "✔" : "•"} One uppercase letter
                </Typography>

                <Typography sx={{ color: pswdBar.lower ? "green" : "#b71c1c" }}>
                  {pswdBar.lower ? "✔" : "•"} One lowercase letter
                </Typography>

                <Typography
                  sx={{ color: pswdBar.number ? "green" : "#b71c1c" }}
                >
                  {pswdBar.number ? "✔" : "•"} One number
                </Typography>

                <Typography
                  sx={{ color: pswdBar.symbol ? "green" : "#b71c1c" }}
                >
                  {pswdBar.symbol ? "✔" : "•"} One special character
                </Typography>
              </Box>
            )}

          <TextField
            value={formData.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(error.confirmPassword)}
            helperText={error.confirmPassword}
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

          {error.error && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              {error.error}
            </Typography>
          )}


          <Button
            variant="contained"
            fullWidth
            onClick={handleSignup}
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#6366f1",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#4f46e5",
              },
              mb: 1,
            }}
          >
            Signup
          </Button>


          <Typography variant="body2" align="center" mt={2}>
            Don't have an account?{" "}
            <Link to="/login" style={{ color: "#6366f1", fontWeight: 500 }}>
              Login
            </Link>
          </Typography>


          {status === "success" && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Signup successful! Redirecting...
            </Alert>
          )}

          {status === "error" && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Please fix the errors and try again.
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
