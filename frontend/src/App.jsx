import React from 'react';
import './App.css';
//import CadastroLivros from './pages/CadastroLivros';
import CadastroEntregadores from './pages/CadastroEntregadores';
import { createTheme, ThemeProvider, Container } from '@mui/material'; 

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}> 
        <CadastroEntregadores />
      </Container>
    </ThemeProvider>
  );
}

export default App;