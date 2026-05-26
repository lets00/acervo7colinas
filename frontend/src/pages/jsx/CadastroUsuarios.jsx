import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box, Typography, TextField, Grid, InputAdornment, FormControl,
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
    OutlinedInput, IconButton, FormHelperText
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import BotaoCadastrar from '../../components/jsx/BotaoCadastrar.jsx';
import "../css/Usuario.css";
import CampoUsuario from "../../components/jsx/CampoUsuario.jsx";
import api from "../../services/apis";

dayjs.locale('pt-br');

const initialState = {
    nomeCompleto: '',
    cpf: '',
    rg: '',
    sexo: '',
    dataNascimento: null,
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    captcha: false,
    rua: '',
    numero: '',
    cep: '',
    bairro: '',
    cidade: 'Garanhuns',
    complemento: ''
};

function CadastroUsuarios() {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [fotos, setFotos] = useState({ perfil: null, rg: null, residencia: null });
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
    };

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, dataNascimento: newValue }));
    };

    const handleFileChange = (file, tipo) => {
        if (!file) return;
        setFotos(prev => ({ ...prev, [tipo]: file }));
        setErrors(prev => ({ ...prev, [tipo]: null }));
    };

    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseUpPassword = (e) => e.preventDefault();

    const handleCancel = () => {
        setFormData(initialState);
        setFotos({ perfil: null, rg: null, residencia: null });
        setErrors({});
        setShowPassword(false);
        setStatusMessage({ type: '', text: '' });
        setResetKey(k => k + 1);
    };

    const validarFormulario = () => {
        const novosErros = {};

        if (!formData.nomeCompleto.trim()) novosErros.nomeCompleto = "Nome completo é obrigatório";
        if (!formData.cpf.trim()) novosErros.cpf = "CPF é obrigatório";
        if (!formData.rg.trim()) novosErros.rg = "RG é obrigatório";
        if (!formData.sexo) novosErros.sexo = "Sexo é obrigatório";
        if (!formData.dataNascimento) novosErros.dataNascimento = "Data de nascimento é obrigatória";
        if (!formData.email.trim()) novosErros.email = "E-mail é obrigatório";
        if (!formData.telefone.trim()) novosErros.telefone = "Telefone é obrigatório";
        if (!formData.senha) novosErros.senha = "Senha é obrigatória";
        if (!formData.confirmarSenha) novosErros.confirmarSenha = "Confirmação de senha é obrigatória";
        if (formData.senha && formData.confirmarSenha && formData.senha !== formData.confirmarSenha) {
            novosErros.confirmarSenha = "As senhas não conferem";
        }
        if (!formData.rua.trim()) novosErros.rua = "Rua é obrigatória";
        if (!formData.numero.trim()) novosErros.numero = "Número é obrigatório";
        if (!formData.cep.trim()) novosErros.cep = "CEP é obrigatório";
        if (!formData.bairro.trim()) novosErros.bairro = "Bairro é obrigatório";
        if (!formData.cidade.trim()) novosErros.cidade = "Cidade é obrigatória";
        if (!formData.complemento.trim()) novosErros.complemento = "Complemento é obrigatório";
        if (!fotos.perfil) novosErros.fotoPerfil = "A foto de perfil é obrigatória";
        if (!fotos.rg) novosErros.fotoRg = "A foto do RG é obrigatória";
        if (!fotos.residencia) novosErros.comprovanteResidencial = "O comprovante de residência é obrigatório";
        if (!formData.captcha) novosErros.captcha = "Confirme que você não é um robô";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setStatusMessage({ type: '', text: '' });
        if (!validarFormulario()) {
            return;
        }
        // Envio de arquivos reais via FormData
        const formDataPayload = new FormData();
        formDataPayload.append('nomeCompleto', formData.nomeCompleto.trim());
        formDataPayload.append('cpf', formData.cpf.trim());
        formDataPayload.append('rg', formData.rg.trim());
        formDataPayload.append('sexo', formData.sexo);
        formDataPayload.append('dataNascimento', dayjs(formData.dataNascimento).format('DD/MM/YYYY'));
        formDataPayload.append('telefone', formData.telefone.trim());
        formDataPayload.append('email', formData.email.trim());
        formDataPayload.append('senha', formData.senha);
        formDataPayload.append('confirmacaoSenha', formData.confirmarSenha);
        formDataPayload.append('rua', formData.rua.trim());
        formDataPayload.append('numero', formData.numero.trim());
        formDataPayload.append('cep', formData.cep.trim());
        formDataPayload.append('bairro', formData.bairro.trim());
        formDataPayload.append('cidade', formData.cidade.trim());
        formDataPayload.append('complemento', formData.complemento.trim());
        formDataPayload.append('captcha', formData.captcha);
        if (fotos.perfil) formDataPayload.append('fotoPerfil', fotos.perfil);
        if (fotos.rg) formDataPayload.append('fotoRg', fotos.rg);
        if (fotos.residencia) formDataPayload.append('comprovanteResidencial', fotos.residencia);
        try {
            setIsSubmitting(true);
            await api.post('/usuarios', formDataPayload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatusMessage({ type: 'success', text: 'Usuário cadastrado com sucesso!' });
            setFormData(initialState);
            setFotos({ perfil: null, rg: null, residencia: null });
            setErrors({});
            setShowPassword(false);
            setResetKey(k => k + 1);
        } catch (error) {
            const mensagem = error.response?.data?.mensagem || error.response?.data?.message || 'Erro ao conectar com o servidor.';
            setStatusMessage({ type: 'error', text: mensagem });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box className="container">
            <Header />
            <Box className="content" sx={{ mt: 0.5 }}>
                <Typography variant="h4" align="center" className="titulo" sx={{ mt: 3 }}>
                    Cadastro Dos Usuários!
                </Typography>

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', width: '1200px',
                    padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                    <Typography className="faixa-text">Cadastro Dos Dados:</Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box className="input-grande">
                        <TextField
                            required name="nomeCompleto" fullWidth label="Nome Completo"
                            variant="outlined" value={formData.nomeCompleto} onChange={handleChange}
                            size="small" sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
                        />
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="CPF" size="small" sx={{ width: "460px" }}
                                        name="cpf" value={formData.cpf} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="RG" size="small" sx={{ width: "460px" }}
                                        name="rg" value={formData.rg} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Sexo" size="small" sx={{ width: "460px" }}
                                        name="sexo" value={formData.sexo} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                        <DatePicker
                                            label="Data de Nascimento"
                                            views={['year', 'month', 'day']}
                                            format="DD/MM/YYYY"
                                            sx={{ width: "460px" }}
                                            value={formData.dataNascimento}
                                            onChange={handleDateChange}
                                            slotProps={{ textField: { fullWidth: true, required: true, size: "small" } }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </Grid>

                        <TextField
                            required fullWidth label="Email" variant="outlined" size="small"
                            sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
                            name="email" value={formData.email} onChange={handleChange}
                        />

                        <Grid item xs={12} md={12}>
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={4}>
                                    <TextField
                                        required fullWidth label="Telefone" variant="outlined" size="small"
                                        placeholder="(00) 00000-0000"
                                        name="telefone" value={formData.telefone} onChange={handleChange}
                                        sx={{ width: '950px', mb: 2, mx: 'auto' }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <img src="https://flagcdn.com/w20/br.png" alt="Brasil" style={{ width: 20, borderRadius: '2px' }} />
                                                        <Typography sx={{ color: 'text.primary', fontSize: '0.9rem' }}>+ 55</Typography>
                                                        <Box sx={{ borderLeft: '1px solid #ccc', height: '20px', ml: 1 }} />
                                                    </Box>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4}>
                            <FormControl sx={{ mt: -1, width: '460px', mb: 2 }} variant="outlined" error={!!errors.senha}>
                                <InputLabel>Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha" value={formData.senha} onChange={handleChange}
                                    error={!!errors.senha}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha" sx={{ height: "50px" }}
                                />
                                {errors.senha && <FormHelperText>{errors.senha}</FormHelperText>}
                            </FormControl>

                            <FormControl sx={{ mt: -1, width: '460px', mb: 2 }} variant="outlined" error={!!errors.confirmarSenha}>
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange}
                                    error={!!errors.confirmarSenha}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirmar Senha" sx={{ height: "50px" }}
                                />
                                {errors.confirmarSenha && <FormHelperText>{errors.confirmarSenha}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', width: '1200px',
                        padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                        <Typography className="faixa-text">Endereço</Typography>
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Rua" size="small" sx={{ width: "794px", mt: 2 }}
                                        name="rua" value={formData.rua} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Numero" size="small" sx={{ width: "120px", mt: 2 }}
                                        name="numero" value={formData.numero} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="CEP" size="small" sx={{ width: "460px", mt: 1 }}
                                        name="cep" value={formData.cep} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Bairro" size="small" sx={{ width: "460px", mt: 1 }}
                                        name="bairro" value={formData.bairro} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth size="small" sx={{ width: "460px", mt: 1 }}>
                                        <InputLabel id="select-cidade-label">Cidade</InputLabel>
                                        <Select labelId="select-cidade-label" name="cidade" value={formData.cidade} onChange={handleChange} label="Cidade">
                                            <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField required fullWidth label="Complemento" size="small" sx={{ width: "460px", mt: 1 }}
                                        name="complemento" value={formData.complemento} onChange={handleChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CampoUsuario
                        onFileChange={handleFileChange}
                        errors={errors}
                        resetKey={resetKey}
                    />

                    <Grid container justifyContent="center" sx={{ mt: 5 }}>
                        <Box className="checkbox-box">
                            <FormControlLabel
                                control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />}
                                label="Não Sou Robô"
                                sx={{ color: "#000", ml: -40 }}
                            />
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
    );
}

export default CadastroUsuarios;