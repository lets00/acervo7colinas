import React from 'react';
import './App.css';
import CadastroLivros from './Componentes/CadastroLivros.jsx';
import { createTheme, ThemeProvider, Container } from '@mui/material'; 

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}> 
        <CadastroLivros />
      </Container>
    </ThemeProvider>
  );
}

export default App;