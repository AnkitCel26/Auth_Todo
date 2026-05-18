import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Todo from './Pages/Todo'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, orange } from '@mui/material/colors'


const theme = createTheme({
  palette: {
    primary: {
      main: blue[700], 
    },
    secondary: {
      main: orange[500], 
      light: '#000000'
    },
    background: {
      default: '#ba2222',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  components: {
 
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, 
          textTransform: 'none',
        },
      },
    },
  },
});


const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Routes>
        
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/todo" element={<Todo/>} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
