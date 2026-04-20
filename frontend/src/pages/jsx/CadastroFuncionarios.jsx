
import React from "react";
import Header from "../../components/jsx/Header";
import {Box, Typography, TextField, Grid, InputAdornment, 
    FormControl, InputLabel, Checkbox, FormControlLabel, 
    Button, OutlinedInput, IconButton, Radio, RadioGroup, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../pages/css/Funcionarios.css";
import BotaoCadastrar from '../../components/jsx/BotaoCadastrar.jsx';
import CampoFuncionario from "../../components/jsx/CampoFuncionario.jsx";


function CadastroFuncionarios() {
    const [senha, setSenha] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleMouseUpPassword = (event) => event.preventDefault();

    function Submit(e) {
        e.preventDefault();
        console.log("Cadastrou!");
    }
    return (
        <Box className="container">
            <Header />
            <Box className="content">
                <Typography
                    variant="h4"
                    align="center"
                     className="titulo" sx={{mt:4}} >
                    Cadastro Dos Funcionários!
                </Typography>

                <Box className="barra" sx={{mt:4}}>
                    <Typography className="barra-texto">
                        Cadastro Dos Dados:
                    </Typography>
                </Box>

                <form onSubmit={Submit} >
                    <Box className="input-grande">
                        <TextField required  fullWidth label="Nome Completo" variant="outlined"  size="small"
                        />
                    </Box>
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                    <TextField fullWidth label="CPF" size="small" sx={{width:"460px"}} />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField fullWidth label="Matrículas dos funcionários" size="small"sx={{width:"460px"}} />
                                </Grid>

                            </Grid>
                        </Grid>

                       
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Cargo" size="small" sx={{  width:"460px"}} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Setor/Área" size="small" sx={{  width:"460px"}} />
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <TextField
                            required fullWidth label="Email" variant="outlined" className="email"
                        />
                       
                        <TextField
                            required
                            fullWidth
                            label="Numero"
                            variant="outlined"
                            size="small"
                            placeholder="Telefone"
                            sx={{
                                maxWidth: '950px', mb: 2, mx: 'auto','& .MuiFormHelperText-root': { marginLeft: 0, color: '#666'}
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
                                            <Box sx={{borderLeft: '1px solid #ccc', height: '20px', ml: 1 }} />
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Grid container spacing={4}>
                            <FormControl sx={{ mt: -1, width: '460px'}} variant="outlined">
                                <InputLabel>Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Senha" sx={{height:"50px"}}
                                />
                            </FormControl>     
                            <FormControl sx={{ mt: -1, width: '460px'}} variant="outlined">
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Confirmar Senha" sx={{height:"50px"}}
                                />
                            </FormControl>  
                        </Grid>      
                    </Grid>
                    <Grid sx={{ml:-60}}>
                        <FormControl sx={{ flexDirection: 'row',alignItems: 'center', mt:3  }}>
                            <FormLabel sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} id="demo-radio-buttons-group-label">Tipo de acesso:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Administrador" sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="male" control={<Radio />} label="Funcionario comum"  sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid sx={{ml:-80}}>
                        <FormControl sx={{ flexDirection: 'row',alignItems: 'center', mt:3 }}>
                            <FormLabel sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} id="demo-radio-buttons-group-label">Disponibilidade:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Ativo" sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="male" control={<Radio />} label="Inativo"  sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                </RadioGroup>
                        </FormControl>
                    </Grid>
                    <CampoFuncionario/>
                    <Grid container justifyContent="center" sx={{mt:6}}>
                        <Box className="robot-box">
                                <FormControlLabel control={<Checkbox />} label="Não Sou Robô" sx={{color:"#000", ml:-40}} />
                        </Box>
                    </Grid>
                    <BotaoCadastrar/>
                </form>
            </Box>
        </Box>
    )
}

export default CadastroFuncionarios;