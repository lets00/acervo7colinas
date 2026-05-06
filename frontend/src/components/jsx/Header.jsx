import React, { useState } from "react";
import { getToken, getUsuario, removeToken } from "../../utils/auth";

import {
  Typography, TextField, Box, Stack, Chip,
  InputAdornment, Divider, Avatar, Menu,
  MenuItem, IconButton, Tooltip,
} from "@mui/material";
import { useNavigate ,Link} from "react-router-dom";

import logo   from "../../assets/logo.png";
import Search from "../../assets/Search.png";
import Perfil from "../../assets/Perfil.png";
import "../css/Header.css";


export default function Header() {
  const [pesquisar, setPesquisar] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const token   = getToken();    // não importado
  const usuario = getUsuario();  // não importado

  // Pega as iniciais do nome ou email
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
              // ✅ LOGADO: mostra avatar com iniciais (ou foto se tiver)
              <>
                <Tooltip title={usuario?.nomeCompleto || usuario?.email || 'Perfil'}>
                  <IconButton onClick={handleAbrirMenu} sx={{ p: 0 }}>
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

                {/* Menu dropdown ao clicar no avatar */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleFecharMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { navigate('/perfil'); handleFecharMenu(); }}>
                    Meu Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sair</MenuItem>
                </Menu>
              </>
            ) : (
              // ❌ NÃO LOGADO: mostra botões normais
              <>
                <Chip
                  label="Criar Conta"
                  size="small"
                  className="header-chip-criar"
                  onClick={() => navigate('/cadastro')}
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