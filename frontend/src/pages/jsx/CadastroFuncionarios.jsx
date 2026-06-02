
import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {Box, Typography, TextField, Grid, InputAdornment, 
    FormControl, InputLabel, Checkbox, FormControlLabel, 
    OutlinedInput, IconButton, Radio, RadioGroup, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../pages/css/Funcionarios.css";
import BotaoCadastrar from '../../components/jsx/BotaoCadastrar.jsx';
import CampoFuncionario from "../../components/jsx/CampoFuncionario.jsx";
import api from "../../services/apis";

function CadastroFuncionarios() {
    const [showPassword, setShowPassword] = useState(false);

    const [fotoPerfil, setFotoPerfil] = useState(null);
 
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        cpf: '',
        matricula: '',
        cargo: '',
        setor: '',
        email: '',
        telefone: '',
        senha: '',
        confirmacaoSenha: '',
        tipoAcesso: 'Funcionário comum',
        disponibilidade: 'Ativo',
        captcha: false
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
 
    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
    };
 
    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();
 
    async function Submit(e) {
        e.preventDefault();
 
        if (formData.senha !== formData.confirmacaoSenha) {
            alert("As senhas não conferem!");
            return;
        }
 
        if (!formData.captcha) {
            alert("Por favor, confirme que você não é um robô!");
            return;
        }

        if (!formData.nomeCompleto || !formData.cpf || !formData.matricula || !formData.cargo || !formData.setor || !formData.email || !formData.telefone) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
 
        const formDataToSend = new FormData();

        formDataToSend.append('nomeCompleto', formData.nomeCompleto);
        formDataToSend.append('cpf', formData.cpf);
        formDataToSend.append('matricula', formData.matricula);
        formDataToSend.append('cargo', formData.cargo);
        formDataToSend.append('setor', formData.setor);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('telefone', formData.telefone);
        formDataToSend.append('tipoAcesso', formData.tipoAcesso);
        formDataToSend.append('disponibilidade', formData.disponibilidade);
        formDataToSend.append('senha', formData.senha);
        formDataToSend.append('confirmacaoSenha', formData.confirmacaoSenha);
        formDataToSend.append('captcha', formData.captcha);

        if (fotoPerfil) {
            formDataToSend.append('fotoPerfil', fotoPerfil);
        }

        try {
            await api.post('/funcionarios', formDataToSend);
            alert("Funcionário cadastrado com sucesso!");
 
            setFormData({
                nomeCompleto: '',
                cpf: '',
                matricula: '',
                cargo: '',
                setor: '',
                email: '',
                telefone: '',
                senha: '',
                confirmacaoSenha: '',
                tipoAcesso: 'Funcionário comum',
                disponibilidade: 'Ativo',
                captcha: false
            });
 
            setShowPassword(false);
 
        } catch (error) {
            console.error("Erro detalhado:", error);
            const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
            alert(`Erro: ${mensagem}`);
            console.log("ERRO DO BACKEND:", error.response?.data);
        }
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
                        <TextField required  fullWidth name="nomeCompleto" label="Nome Completo" variant="outlined"  size="small" value={formData.nomeCompleto} onChange={handleChange}
                        />
                    </Box>
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                    <TextField fullWidth name="cpf" label="CPF" size="small" sx={{width:"460px"}}   value={formData.cpf} onChange={handleChange}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField fullWidth name="matricula" label="Matrículas dos funcionários" size="small"sx={{width:"460px"}} value={formData.matricula} onChange={handleChange} />
                                </Grid>

                            </Grid>
                        </Grid>

                       
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth name="cargo" label="Cargo" size="small" sx={{  width:"460px"}}   value={formData.cargo} onChange={handleChange}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth name="setor" label="Setor/Área" size="small" sx={{  width:"460px"}}   value={formData.setor} onChange={handleChange}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <TextField
                            required fullWidth name="email" label="Email" variant="outlined" className="email" value={formData.email} onChange={handleChange}
                        />
                       
                        <TextField
                            required
                            fullWidth
                            name="telefone"
                            label="Numero"
                            variant="outlined"
                            size="small"
                            placeholder="Telefone"
                            value={formData.telefone} onChange={handleChange}
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
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange} 
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
                                    name="confirmacaoSenha"
                                    value={formData.confirmacaoSenha}
                                    onChange={handleChange}
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
                            <FormLabel sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} id="tipo-acesso-label">Tipo de acesso:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="tipo-acesso-label"
                                    name="tipoAcesso"
                                    value={formData.tipoAcesso}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Administrador" control={<Radio />} label="Administrador" sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="Funcionário comum" control={<Radio />} label="Funcionario comum"  sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid sx={{ml:-80}}>
                        <FormControl sx={{ flexDirection: 'row',alignItems: 'center', mt:3 }}>
                            <FormLabel sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} id="disponibilidade-label">Disponibilidade:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="disponibilidade-label"
                                    name="disponibilidade"
                                    value={formData.disponibilidade}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="Inativo" control={<Radio />} label="Inativo"  sx={{color:"#242424",  fontFamily: "'Roboto', sans-serif"}} />
                                </RadioGroup>
                        </FormControl>
                    </Grid>
                    <CampoFuncionario
                        onFileChange={(file) => {
                            setFotoPerfil(file);
                        }}
                    />
                    <Grid container justifyContent="center" sx={{mt:6}}>
                        <Box className="robot-box">
                                <FormControlLabel control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />} label="Não Sou Robô" sx={{color:"#000", ml:-40}} />
                        </Box>
                    </Grid>
                    <BotaoCadastrar/>
                </form>
            </Box>
        </Box>
    )
}

export default CadastroFuncionarios;