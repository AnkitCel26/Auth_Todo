// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUsers, saveUser } from "../localStorage";
// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
//   AlertTitle,
//   Stack,
//   Dialog,
// } from "@mui/material";

// import * as Yup from "yup";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [status, setStatus] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//   });

//   const [error, setError] = useState({});
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handleSignup = () => {
//   //   const { name, email, password, confirmPassword, mobile } = formData;

//   //   if (!name || !email || !password || !confirmPassword || !mobile) {
//   //     setError("All fields are required & must be filled out");
//   //     return;
//   //   }
//   //   if (mobile.length !== 10 || /^[6-9]\d{9}$/.test(mobile)) {
//   //     setError(
//   //       "Mobile number must be exactly 10 digits and contain only numbers",
//   //     );
//   //     return;
//   //   }
//   //   if (password !== confirmPassword) {
//   //     setError("Password and Confirm Password do not match");
//   //     return;
//   //   }
//   //   if (password.length < 6) {
//   //     setError("Password must be at least 6 characters long");
//   //     return;
//   //   }

//   const ValidateSignup = Yup.object({
//     name: Yup.string()
//       .required("Name is required")
//       .min(3, "Name must be at least 3 characters long"),
//     email: Yup.string()
//       .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
//       .email("Invalid email format")
//       .required("Email is required"),
//     mobile: Yup.string()
//       .matches(
//         /^[6-9]\d{9}$/,
//         "Mobile number must be exactly 10 digits and start with 6-9",
//       )
//       .required("Mobile number is required"),

//     password: Yup.string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters long")

//       .matches(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         "Password must contain at least one special character",
//       )
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//       .matches(/[0-9]/, "Password must contain at least one number"),

//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//   });
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       await ValidateSignup.validate(formData, { abortEarly: false });
//     } catch (error) {
//       const newError = {};
//       error.inner.forEach((err) => {
//         newError[err.path] = err.message;
//       });
//       setError(newError);
//       return;
//     }

//     const { name, email, password, confirmPassword, mobile } = formData;

//     const users = getUsers();
//     const userExists = users.find((user) => user.email === email);
//     if (userExists) {
//       setError({ error: "User with this email already exists" });
//       return;
//     }

//     users.push({ name, email, password, mobile });
//     saveUser(users);

//     setStatus("success");

//     setTimeout(() => {
//       navigate("/");
//     }, 4500);
//   };
//   return (
//     // <Dialog open={true}>
//      <Dialog
//       open={true}
//       slotProps={{
//         backdrop: {
//           sx: {
//             backgroundColor: "rgb(105, 211, 243)", // Change opacity or color
//             backdropFilter: "blur(5px)", // Add a blur effect
//           },
//         },
//       }}
//     >
//       <Box>
//       <Paper sx={{ padding: "2rem", width: "300px" }}>
//         <Typography variant="h5" align="center">
//           Signup
//         </Typography>
//         <TextField
//           value={formData.name}
//           label="Name"
//           name="name"
//           placeholder="Enter your name"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//           error={!!error.name}
//           helperText={error.name}
//         />
//         <TextField
//           value={formData.email}
//           label="Email"
//           name="email"
//           placeholder="x@gmail.com"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//           error={!!error.email}
//           helperText={error.email}
//         />
//         <TextField
//           value={formData.mobile}
//           label="Mobile"
//           name="mobile"
//           placeholder="Enter phone number"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//           error={!!error.mobile}
//           helperText={error.mobile}
//         />
//         <TextField
//           value={formData.password}
//           label="Password"
//           name="password"
//           type="password"
//           placeholder="Enter your password"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//           error={!!error.password}
//           helperText={error.password}
//         />
//         <TextField
//           value={formData.confirmPassword}
//           label="Confirm Password"
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirm your password"
//           fullWidth
//           margin="normal"
//           onChange={handleChange}
//           error={!!error.confirmPassword}
//           helperText={error.confirmPassword}
//         />
//         {error && (
//           <Typography color="error" align="center">
//             {Object.values(error).join(" ")}
//           </Typography>
//         )}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleSignup}
//         >
//           Signup
//         </Button>
//         {status === "success" && (
//           <Alert severity="success">Signup successful! Redirecting...</Alert>
//         )}

//         {status === "error" && (
//           <Alert severity="error">Please fix the errors and try again.</Alert>
//         )}
//       </Paper>
//     </Box>
//     </Dialog>
//   );
// };

// export default Signup;

// import React from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getUsers, saveUser } from "../localStorage";

// import {
//   Box,
//   Button,
//   Paper,
//   TextField,
//   Typography,
//   Alert,
//   Stack,
//   Dialog,
// } from "@mui/material";

// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

// import * as Yup from "yup";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [status, setStatus] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     mobile: "",
//   });

//   const [error, setError] = useState({});

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const ValidateSignup = Yup.object({
//     name: Yup.string()
//       .required("Name is required")
//       .min(3, "Name must be at least 3 characters long"),
//     email: Yup.string()
//       .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
//       .email("Invalid email format")
//       .required("Email is required"),
//     mobile: Yup.string()
//       .matches(
//         /^[6-9]\d{9}$/,
//         "Mobile number must be exactly 10 digits and start with 6-9",
//       )
//       .required("Mobile number is required"),

//     password: Yup.string()
//       .required("Password is required")
//       .min(8, "Password must be at least 8 characters long")
//       .matches(
//         /[!@#$%^&*(),.?":{}|<>]/,
//         "Password must contain at least one special character",
//       )
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//       .matches(/[0-9]/, "Password must contain at least one number"),

//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//   });

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       await ValidateSignup.validate(formData, { abortEarly: false });
//     } catch (error) {
//       const newError = {};
//       error.inner.forEach((err) => {
//         newError[err.path] = err.message;
//       });
//       setError(newError);
//       return;
//     }

//     const { name, email, password, mobile } = formData;

//     const users = getUsers();
//     const userExists = users.find((user) => user.email === email);

//     if (userExists) {
//       setError({ error: "User with this email already exists" });
//       return;
//     }

//     users.push({ name, email, password, mobile });
//     saveUser(users);

//     setStatus("success");

//     setTimeout(() => {
//       navigate("/");
//     }, 4500);
//   };

//   return (
//     <Dialog
//       open={true}
//       slotProps={{
//         backdrop: {
//           sx: {
//             backgroundColor: "rgba(15, 23, 42, 0.6)",
//             backdropFilter: "blur(6px)",
//           },
//         },
//       }}
//     >
//       <Box sx={{ p: 2, bgcolor: "#f4f6f8" }}>
//         <Paper
//           elevation={0}
//           sx={{
//             p: 3,
//             width: 340,
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           {/* HEADER */}
//           <Stack spacing={1} alignItems="center" mb={3}>
//             <PersonAddAlt1Icon sx={{ fontSize: 32, color: "#6366f1" }} />

//             <Typography variant="h6" fontWeight={600}>
//               Signup
//             </Typography>

//             <Typography variant="body2" color="text.secondary">
//               Create your account
//             </Typography>
//           </Stack>

//           {/* INPUTS */}
//           <TextField
//             value={formData.name}
//             label="Name"
//             name="name"
//             fullWidth
//             margin="normal"
//             onChange={handleChange}
//             error={!!error.name}
//             helperText={error.name}
//           />

//           <TextField
//             value={formData.email}
//             label="Email"
//             name="email"
//             fullWidth
//             margin="normal"
//             onChange={handleChange}
//             error={!!error.email}
//             helperText={error.email}
//           />

//           <TextField
//             value={formData.mobile}
//             label="Mobile"
//             name="mobile"
//             fullWidth
//             margin="normal"
//             onChange={handleChange}
//             error={!!error.mobile}
//             helperText={error.mobile}
//           />

//           <TextField
//             value={formData.password}
//             label="Password"
//             name="password"
//             type="password"
//             fullWidth
//             margin="normal"
//             onChange={handleChange}
//             error={!!error.password}
//             helperText={error.password}
//           />

//           <TextField
//             value={formData.confirmPassword}
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             fullWidth
//             margin="normal"
//             onChange={handleChange}
//             error={!!error.confirmPassword}
//             helperText={error.confirmPassword}
//           />

//           {/* GLOBAL ERROR */}
//           {error.error && (
//             <Typography color="error" align="center" sx={{ mt: 1 }}>
//               {error.error}
//             </Typography>
//           )}

//           {/* BUTTON */}
//           <Button
//             variant="contained"
//             fullWidth
//             onClick={handleSignup}
//             sx={{ mt: 2 }}
//           >
//             Signup
//           </Button>

//           {/* STATUS */}
//           {status === "success" && (
//             <Alert severity="success" sx={{ mt: 2 }}>
//               Signup successful! Redirecting...
//             </Alert>
//           )}

//           {status === "error" && (
//             <Alert severity="error" sx={{ mt: 2 }}>
//               Please fix the errors and try again.
//             </Alert>
//           )}
//         </Paper>
//       </Box>
//     </Dialog>
//   );
// };

// export default Signup;

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, saveUser } from "../localStorage";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  Stack,
  Dialog,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await ValidateSignup.validate(formData, { abortEarly: false });
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
    }, 4500);
  };

  return (
    <Dialog
      open={true}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
    >
      <Box sx={{ p: 2, bgcolor: "#f4f6f8" }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: 340,
            border: "1px solid #e2e8f0",
            bgcolor: "#fff",
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
            error={!!error.name}
            helperText={error.name}
          />

          <TextField
            value={formData.email}
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
          />

          <TextField
            value={formData.mobile}
            label="Mobile"
            name="mobile"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error.mobile}
            helperText={error.mobile}
          />

          <TextField
            value={formData.password}
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />

          <TextField
            value={formData.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
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
            }}
          >
            Signup
          </Button>

          
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
        </Paper>
      </Box>
    </Dialog>
  );
};

export default Signup;
