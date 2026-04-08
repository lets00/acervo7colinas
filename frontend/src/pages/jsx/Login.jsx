import React from "react";
import { Box } from "@mui/material";
import "../css/Login.css";
import Header from "../../components/jsx/HeaderLogin";
import StackBooks from '../../assets/StackBooks.png';    
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CCD3F8',
    },
    background: {
      default: '#CCD3F8',
    },
  },
});

function Login() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.default', mt:-9, ml:-11 }} className="container" 
      >
        <Header />
         <Box component="img"  src={StackBooks} alt="StackBooks" /*className="img-preview"*/ />
      </Box>

    </ThemeProvider>
  );
}

export default Login;