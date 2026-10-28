
import React, { useEffect, useState } from "react";
import PageContent from "./PageContent";

import { getToken, getUsuario, removeToken } from "../../utils/auth";
import { obterFotoPerfil } from "../../utils/fotoPerfil";
import api from "../../services/apis";


import {
  Typography, TextField, Box, Stack, Chip,
  InputAdornment, Divider, Avatar, Menu,
  MenuItem, IconButton, Tooltip, Badge,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import logo   from "../../assets/logo.png";
import Search from "../../assets/Search.png";
import Perfil from "../../assets/Perfil.png";
import iconEmprestimo from "../../assets/header/emprestimos-livros-selecionado.png";
import { useEmprestimo } from "../../context/EmprestimoContext";
import "../css/Header.css";

const carregarUsuarioHeader = () => {
  const dadosUsuario = getUsuario();
  if (!dadosUsuario) return null;

  const fotoPerfil = obterFotoPerfil(dadosUsuario.email) || dadosUsuario.fotoPerfil || "";

  return {
    ...dadosUsuario,
    fotoPerfil: fotoPerfil.startsWith("/") && !fotoPerfil.startsWith("//")
      ? `${api.defaults.baseURL}${fotoPerfil}`
      : fotoPerfil,
  };
};

export default function Header() {
  const navegacaoNoMenu = useMediaQuery('(max-width: 600px)');
  const [pesquisar, setPesquisar] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const token = getToken();
  const [usuario, setUsuario] = useState(carregarUsuarioHeader);
  const { livros: livrosEmprestimo } = useEmprestimo();
  const quantidadeEmprestimo = livrosEmprestimo.length;

  useEffect(() => {
    setPesquisar(new URLSearchParams(location.search).get("q") || "");
  }, [location.search]);

  useEffect(() => {
    const atualizarUsuario = () => {
      setUsuario(carregarUsuarioHeader());
    };

    window.addEventListener("usuario-atualizado", atualizarUsuario);
    return () => window.removeEventListener("usuario-atualizado", atualizarUsuario);
  }, []);

  const isAdmin =
    usuario?.cargo?.toLowerCase() === "administrador";

  const [anchorMenu, setAnchorMenu] = useState(null);

  const [anchorCriarConta, setAnchorCriarConta] = useState(null);

  const abrirMenuCriarConta = (event) => {
    setAnchorCriarConta(event.currentTarget);
  };

  const fecharMenuCriarConta = () => {
    setAnchorCriarConta(null);
  };

  const abrirMenuHamburguer = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const fecharMenuHamburguer = () => {
    setAnchorMenu(null);
  };

  const [anchorUsuariosSalvos, setAnchorUsuariosSalvos] = useState(null);

  const abrirMenuUsuariosSalvos = (event) => {
  setAnchorUsuariosSalvos(event.currentTarget);
  };

  const fecharMenuUsuariosSalvos = () => {
    setAnchorUsuariosSalvos(null);
  };

  const getIniciais = () => {
    if (usuario?.nomeCompleto) {
      return usuario.nomeCompleto
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }
    if (usuario?.email) {
      return usuario.email[0].toUpperCase();
    }
    return '?';
  };

  const handleAbrirMenu = (e) => setAnchorEl(e.currentTarget);
  const handleFecharMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    removeToken();
    handleFecharMenu();
    navigate('/login');
  };

  const handlePesquisar = () => {
    const termo = pesquisar.trim();
    const caminho = location.pathname === "/" || location.pathname === "/acervo"
      ? location.pathname
      : "/acervo";

    navigate({
      pathname: caminho,
      search: termo ? `?q=${encodeURIComponent(termo)}` : "",
    });
  };

    return (
    <Box className="header-container">
      <PageContent responsive component="div" className="header-content" sx={{ minHeight: 80
        , py: 1 }}>

        <Box className="header-brand-nav">
        <img src={logo} alt="Logo" className="header-logo" />

        <Typography component={Link} to="/"className="header-text">Inicio</Typography>
        <Typography component={Link} to="/acervo" className="header-text">Acervo</Typography>
        </Box>
        
        <TextField
          size="small"
          className="header-input"
          label="Procure seu livro"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handlePesquisar();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Pesquisar livros"
                  onClick={handlePesquisar}
                  edge="end"
                  size="small"
                >
                  <img src={Search} alt="" className="header-search-icon" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={2} className="header-stack">
          <Stack direction="row" className="header-stack-row">

            {token ? (
              <>
                <Tooltip title="Minha solicitação de empréstimo">
                  <IconButton
                    onClick={() => navigate("/solicitacao-emprestimo")}
                    sx={{ p: 0.5 }}
                  >
                    <Badge badgeContent={quantidadeEmprestimo} color="error" max={99}>
                      <img
                        src={iconEmprestimo}
                        alt="Solicitação de empréstimo"
                        className="header-emprestimo-icon"
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title={usuario?.nomeCompleto || usuario?.email || "Perfil"}>
                  <IconButton
                    onClick={() => navigate("/perfil")}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      alt={usuario?.nomeCompleto}
                      src={usuario?.fotoPerfil}
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: "#00A83F",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {getIniciais()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={abrirMenuHamburguer} aria-label="Abrir menu" aria-haspopup="true" aria-expanded={Boolean(anchorMenu)}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorMenu}
                  open={Boolean(anchorMenu)}
                  onClose={fecharMenuHamburguer}
                >
                  {navegacaoNoMenu && <MenuItem component={Link} to="/" onClick={fecharMenuHamburguer}>Início</MenuItem>}
                  {navegacaoNoMenu && <MenuItem component={Link} to="/acervo" onClick={fecharMenuHamburguer}>Acervo</MenuItem>}
                  <MenuItem
                    onClick={() => {
                      navigate("/perfil");
                      fecharMenuHamburguer();
                    }}
                  >
                    Meu Perfil
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/meus-emprestimos");
                      fecharMenuHamburguer();
                    }}
                  >
                    Meus Empréstimos
                  </MenuItem>

                  {isAdmin && (
                    <>
                      <MenuItem
                        onClick={() => {
                          navigate("/livros");
                          fecharMenuHamburguer();
                        }}
                      >
                        Cadastrar Livro
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          navigate("/livros-salvos");
                          fecharMenuHamburguer();
                        }}
                      >
                        Livros Salvos
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          navigate("/funcionarios");
                          fecharMenuHamburguer();
                        }}
                      >
                        Cadastro Funcionários
                      </MenuItem>
                      <MenuItem onClick={abrirMenuUsuariosSalvos}>
                        Usuarios Salvos
                      </MenuItem>
                      <Menu
                        anchorEl={anchorUsuariosSalvos}
                        open={Boolean(anchorUsuariosSalvos)}
                        onClose={fecharMenuUsuariosSalvos}
                      >
                        <MenuItem
                          onClick={() => {
                            navigate("/entragadores-salvos");
                            fecharMenuUsuariosSalvos();
                            fecharMenuHamburguer();
                          }}
                        >
                           Entregadores Salvos
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            navigate("/usuarios-salvos");
                            fecharMenuUsuariosSalvos();
                            fecharMenuHamburguer();
                          }}
                        >
                          Usuários Salvos
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            navigate("/funcionarios-salvos");
                            fecharMenuUsuariosSalvos();
                            fecharMenuHamburguer();
                          }}
                        >
                          Funcionários Salvos
                        </MenuItem>
                      </Menu>
                    </>
                  )}

                  {!isAdmin && (
                    <MenuItem
                      onClick={() => {
                        navigate("/dashboard");
                        fecharMenuHamburguer();
                      }}
                    >
                      Dashboard
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      fecharMenuHamburguer();
                    }}
                  >
                    Sair
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Chip
                  label="Criar Conta"
                  size="small"
                  className="header-chip-criar"
                  onClick={abrirMenuCriarConta}
                />
                  <Menu
                    anchorEl={anchorCriarConta}
                    open={Boolean(anchorCriarConta)}
                    onClose={fecharMenuCriarConta}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/usuarios");
                        fecharMenuCriarConta();
                      }}
                    >
                      Usuário
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/entregadores");
                        fecharMenuCriarConta();
                      }}
                    >
                      Entregador
                    </MenuItem>
                  </Menu>
                <Chip
                  label="Login"
                  size="small"
                  className="header-chip-login"
                  onClick={() => navigate('/login')}
                />
                <IconButton className="header-mobile-menu" onClick={abrirMenuHamburguer} aria-label="Abrir menu" aria-haspopup="true" aria-expanded={Boolean(anchorMenu)}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={fecharMenuHamburguer}>
                  {navegacaoNoMenu && <MenuItem component={Link} to="/" onClick={fecharMenuHamburguer}>Início</MenuItem>}
                  {navegacaoNoMenu && <MenuItem component={Link} to="/acervo" onClick={fecharMenuHamburguer}>Acervo</MenuItem>}
                  <MenuItem component={Link} to="/usuarios" onClick={fecharMenuHamburguer}>Criar conta de usuário</MenuItem>
                  <MenuItem component={Link} to="/entregadores" onClick={fecharMenuHamburguer}>Criar conta de entregador</MenuItem>
                  <MenuItem component={Link} to="/login" onClick={fecharMenuHamburguer}>Entrar</MenuItem>
                </Menu>
              </>
            )}

          </Stack>
        </Stack>
      </PageContent>
      <Divider className="header-divider" />
    </Box>
  );
}
