import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Container } from "@mui/material";

import Home from "./pages/jsx/Home.jsx";
import InformacaoLivro from "./pages/jsx/informacaoLivro.jsx";
import CadastroEntregadores from "./pages/jsx/CadastroEntregadores.jsx";
import CadastroLivros from "./pages/jsx/CadastroLivros.jsx";
import CadastroFuncionarios from "./pages/jsx/CadastroFuncionarios.jsx";
import CadastroUsuarios from "./pages/jsx/CadastroUsuarios.jsx";
import Login from "./pages/jsx/Login.jsx";
import EsqueciSenha from "./pages/jsx/EsqueciSenha.jsx";
import EnviadoEmail from "./pages/jsx/EnviadoEmail.jsx";
import GerarSenha from "./pages/jsx/GerarSenha.jsx";

import Dashboard from "./pages/jsx/dashboard.jsx";
import MeusEmprestimos from "./pages/jsx/MeusEmprestimos.jsx";


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container  maxWidth={false} sx={{ marginTop: '2rem' }}> 

          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livro/:id" element={<InformacaoLivro />} />
            <Route path="/livros" element={<CadastroLivros />} />
            <Route path="/entregadores" element={<CadastroEntregadores />} />
            <Route path="/funcionarios" element={<CadastroFuncionarios />} />
            <Route path="/usuarios" element={<CadastroUsuarios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/enviado-email" element={<EnviadoEmail />} />
            <Route path="/gerar-senha" element={<GerarSenha />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/emprestimos" element={<MeusEmprestimos />} />
          </Routes>

        </Container>
      </BrowserRouter>
        
    </ThemeProvider>
  );
}

export default App;