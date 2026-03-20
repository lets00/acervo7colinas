import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Container } from "@mui/material";

import Home from "./pages/jsx/Home.jsx";
import InformacaoLivro from "./pages/jsx/informacaoLivro.jsx";
import CadastroLivros from "./pages/jsx/CadastroLivros.jsx";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container >
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livro/:id" element={<InformacaoLivro />} />
            <Route path="/cadastro" element={<CadastroLivros />} />
          </Routes>

        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;