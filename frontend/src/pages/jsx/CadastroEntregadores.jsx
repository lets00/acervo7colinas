
import React from "react";
import Header from "../../components/jsx/Header";
import { Box, Typography, TextField,Grid ,InputAdornment, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,Button,  OutlinedInput, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import BotaoCadastrar  from '../../components/jsx/BotaoCadastrar.jsx';
import "../css/Entregadores.css";
import CampoEntregador from "../../components/jsx/CampoEntregador.jsx";     

dayjs.locale('pt-br');

function CadastroEntregadores() {
    const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };
    
    const [cidade, setCidade] = React.useState('Garanhuns');

    const [senha, setSenha] = React.useState('');
    const [confirmarSenha, setConfirmarSenha] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const handleCidadeChange = (event) => {
        setCidade(event.target.value);
    }

    function Submit(e) {
        e.preventDefault();
        console.log("Cadastrou o entregador");
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box className="container" >
            <Header />
            <Box className="content" >
                <Typography
                    variant="h4"
                    align="center"
                    className="titulo" sx={{mt: 3}} >
                    Cadastro Dos Entregadores! 
                </Typography>

                <Box className="faixa-entrega "   sx={{mt: 3}} >
                    <Typography className="textoFaixa" >
                        Cadastro Dos Dados:
                    </Typography>
                </Box>

                <form onSubmit={Submit}  >
                    <Box className="inputGrande" >
                        <TextField required  fullWidth label="Nome Completo" variant="outlined"  size="small" sx={{mt:2}}
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
                                    <TextField required fullWidth label="Sexo" size="small" sx={{  width:"460px"}} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}  adapterLocale="pt-br">
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
                            required fullWidth label="Email" variant="outlined" size="small" sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Numero"
                            variant="outlined"
                            size="small"
                            placeholder="Telefone"
                            helperText = "Propostas serão enviadas para este número via WhatsApp"
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

                    <Box className="faixa-entrega "  sx={{mt: 6}} >
                        <Typography className="textoFaixa" >
                            Endereço
                        </Typography>
                    </Box>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                <TextField fullWidth label="Rua" size="small" sx={{width:"794px", mt: 2}} />
                                </Grid>

                                <Grid item xs={6}>
                                <TextField fullWidth label="Numero" size="small"sx={{width:"120px", mt: 2}} />
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
                    <CampoEntregador />
                    
                    <Grid container justifyContent="center" sx={{mt: 6}}>
                        <Box className="boxCaptcha" >
                                <FormControlLabel control={<Checkbox />} label="Não Sou Robô" sx={{color:"#000", ml:-40}} />
                        </Box>
                    </Grid>
                    <BotaoCadastrar/>
                </form>
            </Box>
        </Box>
    )
}

export default CadastroEntregadores;