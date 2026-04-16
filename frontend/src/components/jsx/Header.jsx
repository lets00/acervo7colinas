import React, { useState } from 'react';
import {  Typography, TextField, Box, Stack, Chip, InputAdornment, Divider  } from '@mui/material';

import logo from "../../assets/logo.png";
import Search from "../../assets/Search.png";
import Perfil from "../../assets/Perfil.png";
import '../css/Header.css';

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
          className="header-input"
          label="Procure seu livro"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img 
                  src={Search} 
                  alt="Lupa" 
                  className='header-search-icon'
                />
              </InputAdornment>
            ),
          }}
        />
        <Stack spacing={2}  className='header-stack'> 
          <Stack direction="row" spacing={4} className='header-stack-row'>
            <Chip label="Criar Conta" size='small' className='header-chip-criar'/> 
            <Chip icon={<img src={Perfil} alt="Perfil" style={{width:20, height:20 }}/>} 
            label="Login" size='small' className='header-chip-login'/> 
          </Stack> 
        </Stack> 
        </Box> 
          <Divider className='header-divider'/>
        </Box>
)
}
