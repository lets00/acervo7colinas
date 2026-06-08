import React, { useState } from "react";
import { getToken, getUsuario, removeToken } from "../../utils/auth";

import {
  Typography, TextField, Box, Stack, Chip,
  InputAdornment, Divider, Avatar, Menu,
  MenuItem, IconButton, Tooltip,
} from "@mui/material";
import { useNavigate ,Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import logo   from "../../assets/logo.png";
import Search from "../../assets/Search.png";
import Perfil from "../../assets/Perfil.png";
import "../css/Header.css";


export default function Header() {
  const [pesquisar, setPesquisar] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const token = getToken();
  const usuario = getUsuario();

  const isAdmin =
    usuario?.cargo?.toLowerCase() === "administrador";

  const [anchorMenu, setAnchorMenu] = useState(null);

  const abrirMenuHamburguer = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const fecharMenuHamburguer = () => {
    setAnchorMenu(null);
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

    return (
    <Box className="header-container">
      <Box className="header-content">

        <img src={logo} alt="Logo" className="header-logo" />

        <Typography component={Link} to="/"className="header-text">Inicio</Typography>
        <Typography component={Link} to="/acervo" className="header-text">Acervo</Typography>
        
        <TextField
          size="small"
          className="header-input"
          label="Procure seu livro"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={Search} alt="Lupa" className="header-search-icon" />
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={2} className="header-stack">
          <Stack direction="row" spacing={4} className="header-stack-row">

            {token ? (
              <>
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
                      {!usuario?.fotoPerfil && getIniciais()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <IconButton onClick={abrirMenuHamburguer}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorMenu}
                  open={Boolean(anchorMenu)}
                  onClose={fecharMenuHamburguer}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/perfil");
                      fecharMenuHamburguer();
                    }}
                  >
                    Meu Perfil
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
                  onClick={() => navigate('/usuarios')}
                />
                <Chip
                  label="Login"
                  size="small"
                  className="header-chip-login"
                  onClick={() => navigate('/login')}
                />
              </>
            )}

          </Stack>
        </Stack>
      </Box>
      <Divider className="header-divider" />
    </Box>
  );
}