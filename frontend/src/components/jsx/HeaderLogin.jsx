import PageContent from "./PageContent";
import React, { useState } from 'react';
import {  Typography, TextField, Box, Toolbar, Button, Stack, Chip, InputAdornment, Divider  } from '@mui/material';

import logo from "../../assets/logo.png";
import SearchPreto from '../../assets/SearchPreto.png';
import Perfil from "../../assets/Perfil.png";
import '../css/Header.css';
import '../css/HeaderLogin.css';
import { useNavigate } from 'react-router-dom';
import { getUsuario } from '../../utils/auth';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";


export default function Header() {
  const [pesquisar, setPesquisar] = useState('');
  const navigate = useNavigate();
  const user = getUsuario();
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';
  const [anchorEl, setAnchorEl] = useState(null);

  const [anchorCriarConta, setAnchorCriarConta] = useState(null);

  const abrirMenuCriarConta = (event) => {
    setAnchorCriarConta(event.currentTarget);
  };

  const fecharMenuCriarConta = () => {
    setAnchorCriarConta(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePerfil = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/perfil');
    }
  };

  return(
    <Box className="header-container header-login">
      <PageContent responsive component="div" className="header-content" sx={{ py: 1.5 }}>

        <img src={logo} alt="Logo" className='header-logo'/>


        <Typography  className='header-text' onClick={() => navigate("/")}sx={{ cursor: "pointer" }}>
          Inicio
        </Typography>
        <Typography className='header-text' onClick={() => navigate("/acervo")}sx={{ cursor: "pointer" }}>
          Acervo
        </Typography>

        <TextField
          size="small"
          className="header-input-preto"
          label="Procure seu livro"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src={SearchPreto}
                  alt="Lupa"
                  className='header-search-icon-preto'
                />
              </InputAdornment>
            ),
          }}
        sx={{bordercolor: "#242424"}}
        />

        <Stack spacing={2}  className='header-stack'>
          <Stack direction="row" spacing={4} className='header-stack-row'>
            <Chip
              label="Criar Conta"
              size="small"
              className="header-chip-criar"
              onClick={abrirMenuCriarConta}
              sx={{ cursor: "pointer" }}
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
            <IconButton className="header-mobile-menu" onClick={handleOpenMenu} aria-label="Abrir menu" aria-haspopup="true" aria-expanded={Boolean(anchorEl)}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {[
                ['Início', '/'],
                ['Acervo', '/acervo'],
                ['Criar conta de usuário', '/usuarios'],
                ['Criar conta de entregador', '/entregadores'],
                ['Entrar', '/login'],
              ].map(([label, route]) => (
                <MenuItem key={route} onClick={() => { navigate(route); setAnchorEl(null); }}>{label}</MenuItem>
              ))}
            </Menu>
          </Stack>
        </Stack>
          </PageContent>
            <Divider className='header-divider'/>
          </Box>
)
}
