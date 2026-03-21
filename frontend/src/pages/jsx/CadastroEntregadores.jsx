
import React from "react";
import Header from "../../components/Header";
import { Box, Typography, TextField,Grid ,InputAdornment, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel,Button,  OutlinedInput, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PerfilCadastros from '../../assets/PerfilCadastros.png'; 
import CNH from '../../assets/CNH.png';

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
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", marginTop: "-55px"
        }}>
            <Header />
            <Box sx={{ width: "100%", maxWidth: "1250px",  mx: "auto"}}>
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
                            required fullWidth label="Email" variant="outlined" size="small" sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
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
                    <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",mb:4,  mt: 4,
                        width: "auto",width: "100%", py: "10px", px: "40px", boxSizing: "border-box", width:"1200px"
                        }} >
                        <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                            Informações de entrega
                        </Typography>
                    </Box>
                    <Grid container justifyContent="center">
                        <Grid item>
                                <Box sx={{ border: "1px solid #ccc",borderRadius: "12px", padding: "12px", 
                                    mt: 1, width: "fit-content", minWidth: "200px", }}>
                                <Typography variant="h6" sx={{ mb: 2, color: "#666", fontWeight: "300", textAlign: "center" }}>
                                    Tipo de entrega:
                                </Typography>

                                <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
                                    <FormControlLabel control={<Checkbox />} label="Moto" sx={{ color: "#000" }}/>
                                    <FormControlLabel control={<Checkbox />} label="Carro" sx={{ color: "#000" }} />
                                    <FormControlLabel control={<Checkbox />} label="Bicicleta" sx={{ color: "#000" }} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Box
                                sx={{ border: "1px solid #ccc",borderRadius: "12px", padding: "12px",
                                    mt: 5, width: "fit-content", minWidth: "200px", }}>
                                <Typography
                                    variant="h6"
                                    sx={{mb: 2, color: "#666", fontWeight: "300", textAlign: "center"}}>
                                    Disponibilidade:
                                </Typography>

                                <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
                                    <FormControlLabel control={<Checkbox />} label="Manhã" sx={{color:"#000"}} />
                                    <FormControlLabel control={<Checkbox />} label="Tarde" sx={{color:"#000"}} />
                                    <FormControlLabel control={<Checkbox />} label="Noite" sx={{color:"#000"}} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt:3}}>
                        <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",  mt: 3,
                            width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"600px"
                            }} >
                            <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem", alignItems: "flex-start", ml:15}}>
                                Foto de Perfil
                            </Typography>
                        </Box>
                        <Box sx={{backgroundColor: "#CCD3F8",display: "flex", alignItems: "center",  mt: 3,
                            width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box", width:"570px"
                            }} >
                            <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem", ml:-2 }}>
                                Foto da CNH
                            </Typography>
                        </Box>
                    </Grid> 
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={5} justifyContent="center">
                            <Box sx={{ border: "1px solid #ccc",borderRadius: "12px", padding: "12px", 
                                mt: -4, minWidth: "400px", minHeight:"100px"}}>
                                    <Typography sx={{ color: "#333", fontWeight: "100", fontSize: "1.2rem", ml:18, mt:4}}>
                                        Selecionar Foto
                                    </Typography>
                                    <Box component="img" src={PerfilCadastros} alt="Perfil"
                                    sx={{ display: "flex", justifyContent: "flex-start", width: '150px', height: '200px', mt:-4 , objectFit: 'cover',  borderRadius: '8px' }}/>
                                    <Button variant="contained" disableElevation sx={{color:"#242424", backgroundColor:"#ccd3f8", ml:18, mt:-15}}>
                                        SELECIONAR FOTO
                                    </Button>
                            </Box>
                            <Box sx={{ border: "1px solid #ccc",borderRadius: "12px", padding: "12px", 
                                mt: -4, minWidth: "400px", minHeight:"100px" }}>
                                    <Typography sx={{ color: "#333", fontWeight: "100", fontSize: "1.2rem", ml:18, mt:5 }}>
                                        Selecionar Foto da CNH
                                    </Typography>
                                    <Box component="img" src={CNH} alt="CNH"
                                    sx={{ display: "flex", justifyContent: "flex-start", width: '200px', height: '210px',mt:-4,  objectFit: 'cover',  borderRadius: '8px' }}/>
                                    <Button variant="contained" disableElevation sx={{color:"#242424",backgroundColor:"#ccd3f8", ml:18, mt:-20}}>
                                        SELECIONAR FOTO
                                    </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" sx={{mt:13}}>
                        <Box sx={{ border: "1px solid #ccc",borderRadius: "12px", 
                                mt: -4, minWidth: "500px", minHeight:"30px", backgroundColor:"#d3d3d3"}}>
                                <FormControlLabel control={<Checkbox />} label="Não Sou Robô" sx={{color:"#000", ml:-40}} />
                        </Box>
                    </Grid>
                    <Box sx={{ mt: 8, display: "flex", gap: 2, justifyContent: "center" }}>
                        <Button
                            type="submit"variant="contained"
                            sx={{ backgroundColor: "#283593", px: 5, py: 1, fontWeight: "bold",minWidth: "300px" 
                            }}>
                            CADASTRAR
                        </Button>
                        <Button 
                             variant="outlined" 
                            sx={{ color: "#283593", borderColor: "#283593", px: 5,py: 1,fontWeight: "bold", minWidth: "300px"}}>
                                CANCELAR
                        </Button>
                    </Box>
                    <Grid>
                        <Typography sx={{ color: "#242424", fontWeight: "100", fontSize: "1.2rem", ml:-20, mt:4}}>
                                Já Tem Cadastro? 
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography sx={{ color: "#312783", fontWeight: "100", fontSize: "1.2rem", ml:14, mt:-3.6}}>
                                Faça Login
                        </Typography>
                    </Grid>
                    <Box sx={{ display: "flex", gap: 2, ml: 68, mt:3 }}>
                        <Button
                            variant="outlined"
                            sx={{
                            borderColor: "#ffff",color: "#ffff",borderRadius: "50%", minWidth: 0, width: 38,
                            height: 40,   "& .MuiButton-startIcon": { margin: 0 } 
                            }}
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="35" alt="Google" />
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                            borderColor: "#ffff", color: "#ffff", borderRadius: "50%", minWidth: 0,  width: 38,
                            height: 40,  p: 0, "& .MuiButton-startIcon": { margin: 0 }
                            }}
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" width="50" alt="Facebook" />
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

export default CadastroEntregadores;