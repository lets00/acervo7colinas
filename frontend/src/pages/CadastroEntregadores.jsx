
import React from "react";
import Header from "../components/Header";
import { Box, Typography, Grid, TextField,InputAdornment } from "@mui/material"; 

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CadastroEntregadores() {
    function Submit(e){
        e.preventDefault();
        console.log("Cadastrou o entregador");
    }
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", marginTop:"-55px"}}>
            <Header/>
            <Box sx={{ width: "1000%", maxWidth: "1250px" }}>

                <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "300", color: "#333", marginTop: "22px" }}>
                    Cadastro Dos Entregadores!
                </Typography>

                <Box sx={{backgroundColor: "#CCD3F8",display: "flex", justifyContent: "flex-start", alignItems: "center", 
                width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box"
                }} >
                    <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                        Dados do Usuário:
                    </Typography>
                </Box>

                <form onSubmit={Submit}>
                    <Grid container  justifyContent="center" sx={{ mb: 3 }}>
                        <Grid item xs={12} md={8}>
                            <TextField required fullWidth label="Nome Completo"
                                variant="outlined" size="small" sx={{ width: '950px' }}/>
                        </Grid>
                    </Grid>
    
                    <Grid container spacing={4} justifyContent="center" >    
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 3 }}>
                                <TextField required fullWidth label="CPF" size="small" sx={{ width: '458px' }} />
                                <TextField required fullWidth label="Sexo" size="small" sx={{ width: '458px' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                <TextField required fullWidth label="RG" size="small" sx={{ width: '458px' }} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Data de Nascimento"
                                        views={['year', 'month']}
                                        format="MM/YYYY"
                                        sx={{width:'458px'}}
                                        slotProps={{ textField: { fullWidth: true, required: true, size: "small"  } }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid container justifyContent="center" sx={{ mt: -3 }}>
                        <Grid item xs={12} md={8}>
                            <TextField required fullWidth label="Email"
                                variant="outlined" size="small" sx={{ width: '950px', mb: 3 }}/>
                            
                            <TextField required fullWidth label="Numero" variant="outlined" size="small" 
                                placeholder="Telefone" helperText="Propostas serão enviadas para este número via WhatsApp"
                                sx={{ width: '950px', '& .MuiFormHelperText-root': {marginLeft: 0, color: '#666'  } 
                                }}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <img 
                                            src="https://flagcdn.com/w20/br.png" 
                                            alt="Brasil" 
                                            style={{ width: 20, borderRadius: '2px' }} 
                                        />
                                        <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>
                                            + 55
                                        </Typography>
                                        <Box sx={{ borderLeft: '1px solid #ccc', height: '20px', ml: 1 }} />
                                        </Box>
                                    </InputAdornment>
                                    ),
                                }}
                                />
                        </Grid>
                    </Grid>
                </Grid>
                </form>
            </Box>
        </Box>
    );
}

export default CadastroEntregadores;