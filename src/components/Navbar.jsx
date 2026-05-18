// import {AppBar, Toolbar, Typography, Button} from '@mui/material';
// import {useNavigate} from 'react-router-dom';

// function Navbar() {
//     const navigate = useNavigate();
    
//     const handleLogout = () => {
//         localStorage.removeItem('currentUser');
//         navigate('/');
//     };
//     return (
//         <AppBar position="static" sx={{backgroundColor: 'secondary.main'}}>
//             <Toolbar sx={{color: 'secondary.light'}}>
//                 <Typography  sx={{ flexGrow: 1 ,fontSize: '1.3rem', fontWeight: 600}}>
//                     Todo App
//                 </Typography>
//                 <Button color="inherit" onClick={handleLogout} variant='contained' sx={{  fontSize: '1.2rem', fontWeight: 600}}>
//                     Logout
//                 </Button>
//             </Toolbar>
//         </AppBar>
//     );
// }

// export default Navbar;

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px",
          px: {
            xs: 2,
            sm: 4,
          },
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              bgcolor: "#6366f1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 8px 20px rgba(99,102,241,0.25)",
            }}
          >
            <ChecklistRoundedIcon
              sx={{
                color: "#fff",
                fontSize: 24,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                color: "#0f172a",
                fontSize: "1.15rem",
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Todo Dashboard
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.8rem",
                fontWeight: 500,
              }}
            >
              Stay organized every day
            </Typography>
          </Box>
        </Box>

        
        <Button
          onClick={handleLogout}
          variant="contained"
          startIcon={<LogoutRoundedIcon />}
          sx={{
            bgcolor: "#6366f1",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 3,
            px: 3,
            py: 1,
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
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;