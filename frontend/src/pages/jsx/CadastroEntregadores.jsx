
import React from "react";
import Header from "../../components/Header";
import { Box, Typography, Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CadastroEntregadores() {
    const [cidade, setCidade] = React.useState('Garanhuns');

    const handleCidadeChange = (event) => {
        setCidade(event.target.value);
    }
    function Submit(e) {
        e.preventDefault();
        console.log("Cadastrou o entregador");
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            bgcolor: "#fff",
            marginTop: "-55px"
        }}>
            <Header />
            <Box sx={{ width: "100%", maxWidth: "1250px", px:2 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        mb: 4, fontWeight: "300", color: "#333", marginTop: "22px"}}
                >
                    Cadastro Dos Entregadores!
                </Typography>

                <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center", 
                    width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"1200px"
                    }} >
                    <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                        Cadastro Dos Livros:
                    </Typography>
                </Box>

                <form onSubmit={Submit} >
                    <Box sx={{ width: '950px', mb: 2 ,  mx: "auto"}}>
                        <TextField
                            required
                            fullWidth
                            label="Nome Completo"
                            variant="outlined"
                            size="small"
                        />
                    </Box>
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                <TextField fullWidth label="CPF" size="small" sx={{width:"460px"}} />
                                </Grid>

                                <Grid item xs={6}>
                                <TextField fullWidth label="RG" size="small"sx={{width:"460px"}} />
                                </Grid>

                            </Grid>
                        </Grid>

                       
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Sexo"
                                        size="small"
                                        sx={{  width:"460px"}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Data de Nascimento"
                                            views={['year', 'month', 'day']}
                                            format="DD/MM/YYYY"
                                            sx={{  width:"460px" }}
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    required: true,
                                                    size: "small"
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            variant="outlined"
                            size="small"
                            sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
                        />
                       
                        <TextField
                            required
                            fullWidth
                            label="Numero"
                            variant="outlined"
                            size="small"
                            placeholder="Telefone"
                            helperText="Propostas serão enviadas para este número via WhatsApp"
                            sx={{
                                maxWidth: '950px',
                                mb: 2,
                                mx: 'auto',
                                '& .MuiFormHelperText-root': {
                                    marginLeft: 0,
                                    color: '#666'
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}>
                                            <img
                                                src="https://flagcdn.com/w20/br.png"
                                                alt="Brasil"
                                                style={{
                                                    width: 20,
                                                    borderRadius: '2px'
                                                }}
                                            />
                                            <Typography sx={{
                                                color: 'text.primary',
                                                fontSize: '0.9rem'
                                            }}>
                                                + 55
                                            </Typography>
                                            <Box sx={{
                                                borderLeft: '1px solid #ccc',
                                                height: '20px',
                                                ml: 1
                                            }} />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Senha" type="password" size="small" sx={{width:"461px", mt:-2}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Confirmar Senha" type="password" size="small" sx={{width:"461px",  mt:-2}} />
                                </Grid>
                            </Grid>
                        </Grid>
                                                
                    </Grid>

                    <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",  mt: 5,
                        width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"1200px"
                        }} >
                        <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                            Endereço
                        </Typography>
                    </Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                <TextField fullWidth label="Rua" size="small" sx={{width:"794px"}} />
                                </Grid>

                                <Grid item xs={6}>
                                <TextField fullWidth label="Numero" size="small"sx={{width:"120px"}} />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                <TextField fullWidth label="CEP" size="small" sx={{width:"460px", mt:1 }} />
                                </Grid>

                                <Grid item xs={6}>
                                <TextField fullWidth label="Bairro" size="small"sx={{width:"460px", mt:1}} />
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small" sx={{ width: "460px", mt: 1 }}>
                                        <InputLabel id="select-cidade-label">Cidade</InputLabel>
                                        <Select
                                            labelId="select-cidade-label"
                                            id="select-cidade"
                                            value={cidade}
                                            label="Cidade"
                                            onChange={handleCidadeChange}
                                        >
                                            <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                <TextField fullWidth label="Complemento" size="small"sx={{width:"460px", mt:1}} />
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>
                    <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",  mt: 5,
                        width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"1200px"
                        }} >
                        <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                            Informações de entrega
                        </Typography>
                    </Box>
                    <Grid container spacing={2} justifyContent="center">
                        
                        <TextField fullWidth label="Tipo de Entrega" size="small" sx={{width:"950px"}} />
                               
                        <TextField fullWidth label="Disponibilidade" size="small"sx={{width:"950px"}} />
                    </Grid>
                    <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",  mt: 5,
                        width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"1200px"
                        }} >
                        <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                            Foto de Perfil
                        </Typography>
                    </Box>
                </form>
            </Box>
        </Box>
    );
}

export default CadastroEntregadores;