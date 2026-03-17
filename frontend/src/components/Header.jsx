import React, { useState } from 'react';
import {  Typography, TextField, Box, Toolbar, Button, Stack, Chip, InputAdornment, Divider  } from '@mui/material';

import logo from '../assets/logo.png'
import Search from '../assets/Search.png'
import Perfil from '../assets/Perfil.png'

export default function Header() {

  const [pesquisar, setPesquisar] = useState('');

  return(
    <Box sx={{ width: '100%' }} >
      <Box style={{ display: 'flex', alignItems: 'center', gap: '40px', borderColor: '#312783'}}>

        <img src={logo} alt="Logo" style={{width:"120px", height:"30px"}}/>

        
        <Typography  style={{ color: '#312783', marginTop: '8px' }}>
          Inicio
        </Typography>
        <Typography style={{ color: '#312783', marginTop: '8px' }}>
          Acervo
        </Typography>

        <TextField
          size="small"
          sx={{ 
            width: '361px', 
            '& .MuiOutlinedInput-root': { 
              borderRadius: '10px', 
              height: '27px' 
            },
            '& .MuiInputLabel-root': { 
              fontSize: '12px',
              marginTop: '-2px',
              color: '#878787',
              borderColor: '#312783', 
            } 
          }}
          label="Procure seu livro"
          value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img 
                  src={Search} 
                  alt="Lupa" 
                  style={{ width: '20px', height: '18px' }} 
                />
              </InputAdornment>
            ),
          }}
        />

        <Stack spacing={2} sx={{ alignItems: 'center', marginTop: '5px' }}>
          <Stack direction="row" spacing={2}>
            <Chip label="Criar Conta" size='small'
            sx={ {backgroundColor:'#CCD3F8', color:'#242424'}}/>
            <Chip icon={<img src={Perfil} alt="Perfil" style={{width:20, height:20 }}/>} label="Login"
              size='small' sx={ {backgroundColor:'#312783', color:'#ffff'}}/>
          </Stack>
        </Stack>
      </Box>
       <Divider sx={{ borderColor: '#937DC2', borderBottomWidth: 1.5, mt: 2 }} />
    </Box>
)
}
