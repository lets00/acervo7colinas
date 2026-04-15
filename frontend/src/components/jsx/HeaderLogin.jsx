import React, { useState } from 'react';
import {  Typography, TextField, Box, Toolbar, Button, Stack, Chip, InputAdornment, Divider  } from '@mui/material';

import logo from "../../assets/logo.png";
import SearchPreto from '../../assets/SearchPreto.png';
import Perfil from "../../assets/Perfil.png";
import '../css/HeaderLogin.css';

export default function Header() {

  const [pesquisar, setPesquisar] = useState('');

  return(
    <Box className="header-container">
      <Box className="header-content">

        <img src={logo} alt="Logo" className='header-logo'/>

        
        <Typography  className='header-text'>
          Inicio
        </Typography>
        <Typography className='header-text'>
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
            <Chip label="Criar Conta" size='small' className='header-chip-criar'/> 
          </Stack> 
        </Stack> 
          </Box> 
            <Divider className='header-divider'/>
            </Box>
)
}
