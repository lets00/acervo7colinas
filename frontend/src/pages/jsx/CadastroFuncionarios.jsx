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

const initialState = {
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
};

function CadastroFuncionarios() {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [perfilFoto, setPerfilFoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [resetKey, setResetKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
        if (errors.captcha) {
            setErrors(prev => ({ ...prev, captcha: null }));
        }
    };

    const handleFileChange = (file) => {
        if (!file) return;
        setPerfilFoto(file);
        setErrors(prev => ({ ...prev, perfilFoto: false }));
    };

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();

    const handleCancel = () => {
        setFormData(initialState);
        setPerfilFoto(null);
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
        setStatusMessage({ type: '', text: '' });
        setResetKey(k => k + 1);
    };

    const validarFormulario = () => {
        const novosErros = {};
        if (!formData.nomeCompleto.trim()) novosErros.nomeCompleto = "Nome completo é obrigatório";
        if (!formData.cpf.trim()) novosErros.cpf = "CPF é obrigatório";
        if (!formData.matricula.trim()) novosErros.matricula = "Matrícula é obrigatória";
        if (!formData.cargo.trim()) novosErros.cargo = "Cargo é obrigatório";
        if (!formData.setor.trim()) novosErros.setor = "Setor é obrigatório";
        if (!formData.email.trim()) novosErros.email = "E-mail é obrigatório";
        if (!formData.telefone.trim()) novosErros.telefone = "Telefone é obrigatório";
        if (!formData.senha) novosErros.senha = "Senha é obrigatória";
        if (!formData.confirmacaoSenha) novosErros.confirmacaoSenha = "Confirmação de senha é obrigatória";
        if (formData.senha && formData.confirmacaoSenha && formData.senha !== formData.confirmacaoSenha) {
            novosErros.confirmacaoSenha = "As senhas não conferem";
        }
        if (!perfilFoto) novosErros.perfilFoto = "A foto de perfil é obrigatória";
        if (!formData.captcha) novosErros.captcha = "Confirme que você não é um robô";
        
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setStatusMessage({ type: '', text: '' });
        if (!validarFormulario()) return;

        try {
            setIsSubmitting(true);

            let fotoBase64 = null;
            if (perfilFoto) {
                fotoBase64 = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(perfilFoto);
                });
            }

            await api.post('/funcionarios', {
                nomeCompleto: formData.nomeCompleto.trim(),
                cpf: formData.cpf.trim(),
                matricula: formData.matricula.trim(),
                cargo: formData.cargo.trim(),
                setor: formData.setor.trim(),
                email: formData.email.trim(),
                telefone: formData.telefone.trim(),
                senha: formData.senha,
                confirmacaoSenha: formData.confirmacaoSenha,
                tipoAcesso: formData.tipoAcesso,
                disponibilidade: formData.disponibilidade,
                captcha: formData.captcha,
                fotoPerfil: fotoBase64
            });

            setStatusMessage({ type: 'success', text: 'Funcionário cadastrado com sucesso!' });
            setFormData(initialState);
            setPerfilFoto(null);
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
            setResetKey(k => k + 1);

        } catch (error) {
            console.error('Erro detalhado:', error);
            const mensagem = error.response?.data?.mensagem || error.response?.data?.message || 'Erro ao conectar com o servidor.';
            setStatusMessage({ type: 'error', text: mensagem });
        } finally {
            setIsSubmitting(false);
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

                <form onSubmit={handleSubmit} >
                    <Box className="input-grande">
                        <TextField required fullWidth name="nomeCompleto" label="Nome Completo" variant="outlined" size="small" value={formData.nomeCompleto} onChange={handleChange} error={!!errors.nomeCompleto} helperText={errors.nomeCompleto || ''} />
                    </Box>
                    <Grid container spacing={2} justifyContent="center">

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                
                                <Grid item xs={6}>
                                    <TextField fullWidth name="cpf" label="CPF" size="small" sx={{width:"460px"}} value={formData.cpf} onChange={handleChange} error={!!errors.cpf} helperText={errors.cpf || ''}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField fullWidth name="matricula" label="Matrículas dos funcionários" size="small" sx={{width:"460px"}} value={formData.matricula} onChange={handleChange} error={!!errors.matricula} helperText={errors.matricula || ''}/>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth name="cargo" label="Cargo" size="small" sx={{ width:"460px"}} value={formData.cargo} onChange={handleChange} error={!!errors.cargo} helperText={errors.cargo || ''}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth name="setor" label="Setor/Área" size="small" sx={{ width:"460px"}} value={formData.setor} onChange={handleChange} error={!!errors.setor} helperText={errors.setor || ''}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <TextField
                            required fullWidth name="email" label="Email" variant="outlined" className="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email || ''}
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
                            error={!!errors.telefone}
                            helperText={errors.telefone || ''}
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
                            <FormControl sx={{ mt: -1, width: '460px'}} variant="outlined" error={!!errors.senha}>
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
                                {errors.senha && <Typography variant="caption" color="error" sx={{mt: 0.5}}>{errors.senha}</Typography>}
                            </FormControl>
                            <FormControl sx={{ mt: -1, width: '460px'}} variant="outlined" error={!!errors.confirmacaoSenha}>
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmacaoSenha"
                                    value={formData.confirmacaoSenha}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirmar Senha" sx={{height:"50px"}}
                                />
                                {errors.confirmacaoSenha && <Typography variant="caption" color="error" sx={{mt: 0.5}}>{errors.confirmacaoSenha}</Typography>}
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
                                    <FormControlLabel value="Administrador" control={<Radio />} label="Administrador" sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="Funcionário comum" control={<Radio />} label="Funcionario comum" sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} />
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
                                    <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} />
                                    <FormControlLabel value="Inativo" control={<Radio />} label="Inativo" sx={{color:"#242424", fontFamily: "'Roboto', sans-serif"}} />
                                </RadioGroup>
                        </FormControl>
                    </Grid>
                     <CampoFuncionario
                        onFileChange={handleFileChange}
                        error={!!errors.perfilFoto}
                        resetKey={resetKey}
                    />
                    {errors.perfilFoto && <Typography color="error" variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>{errors.perfilFoto}</Typography>}

                    <Grid container justifyContent="center" sx={{mt:6}}>
                        <Box className="robot-box">
                                <FormControlLabel control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />} label="Não Sou Robô" sx={{color:"#000", ml:-40}} />
                                {errors.captcha && (
                                    <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                                        {errors.captcha}
                                    </Typography>
                                )}
                        </Box>
                    </Grid>

                    {statusMessage.text && (
                        <Typography
                            sx={{
                                mt: 3,
                                textAlign: 'center',
                                color: statusMessage.type === 'success' ? 'success.main' : 'error.main'
                            }}
                        >
                            {statusMessage.text}
                        </Typography>
                    )}

                     <BotaoCadastrar onCancel={handleCancel} loading={isSubmitting} disabled={isSubmitting} />
                </form>
            </Box>
        </Box>
    )
}

export default CadastroFuncionarios;