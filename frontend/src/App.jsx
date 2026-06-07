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


import ProtectedRoute from "./components/jsx/ProtectedRoute.jsx";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth={false} sx={{ marginTop: '2rem' }}>
          <Routes>
            {/* 🔓 Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<EsqueciSenha />} />
            <Route path="/enviado-email" element={<EnviadoEmail />} />
            <Route path="/gerar-senha" element={<GerarSenha />} />
            <Route path="/senha-alterada" element={<SenhaAlterada />} />
            <Route path="/livro/:id" element={<InformacaoLivro />} />
            <Route path="/usuarios" element={<CadastroUsuarios />} />
            <Route path="/acervo" element={<NossoAcervo />} />

            {/* 👤 Rotas do Usuário (e superiores) */}

            <Route path="/emprestimos" element={<ProtectedRoute allowedRoles={['usuario', 'admin', 'funcionario']}><MeusEmprestimos /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['usuario', 'admin', 'funcionario', 'entregador']}><Dashboard /></ProtectedRoute>} />

            {/* 🔧 Rotas de Funcionário/Admin */}
            <Route path="/livros" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><CadastroLivros /></ProtectedRoute>} />
            <Route path="/editar-livro/:id" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><EditarLivros /></ProtectedRoute>} />
            <Route path="/livros-salvos" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><LivrosSalvos /></ProtectedRoute>} />
            <Route path="/entregadores" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><CadastroEntregadores /></ProtectedRoute>} />
            <Route path="/entregadores-salvos" element={<ProtectedRoute allowedRoles={['admin', 'funcionario']}><EntregadoresSalvos /></ProtectedRoute>} />

            {/* 🔴 Rotas Exclusivas do Admin */}
            <Route path="/funcionarios" element={<ProtectedRoute allowedRoles={['admin']}><CadastroFuncionarios /></ProtectedRoute>} />
            <Route path="/funcionarios-salvos" element={<ProtectedRoute allowedRoles={['admin']}><FuncionariosSalvos /></ProtectedRoute>} />
          </Routes>

        </Container>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;