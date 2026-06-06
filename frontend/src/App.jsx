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
import SenhaAlterada from "./pages/jsx/SenhaAlterada.jsx"
import Dashboard from "./pages/jsx/dashboard.jsx";
import MeusEmprestimos from "./pages/jsx/MeusEmprestimos.jsx";
import LivrosSalvos from "./pages/jsx/LivrosSalvos.jsx";
import NossoAcervo from "./pages/jsx/NossoAcervo.jsx";
import FuncionariosSalvos from "./pages/jsx/FuncionariosSalvos.jsx";
import EntregadoresSalvos from "./pages/jsx/EntregadoresSalvos.jsx";
import EditarLivros from "./pages/jsx/EditarLivros.jsx";
import UsuariosSalvos from "./pages/jsx/UsuariosSalvos.jsx";


const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth={false} sx={{ marginTop: '2rem' }}>
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
            <Route path="/senha-alterada" element={<SenhaAlterada />} />
            <Route path="/livros-salvos" element={<LivrosSalvos />} />
            <Route path="/emprestimos" element={<MeusEmprestimos />} />
            <Route path="/acervo" element={<NossoAcervo />} />
            <Route path="/funcionarios-salvos" element={<FuncionariosSalvos />} />
            <Route path="/entregadores-salvos" element={<EntregadoresSalvos />} />
            <Route path="/editar-livro/:id" element={<EditarLivros />} />
            <Route path="/usuarios-salvos" element={<UsuariosSalvos />} />

          </Routes>

        </Container>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;