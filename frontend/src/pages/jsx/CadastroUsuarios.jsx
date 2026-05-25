import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box, Typography, TextField, Grid, InputAdornment, FormControl,
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel,
    OutlinedInput, IconButton
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
    const [senhaError, setSenhaError] = useState(false);
    const [fotos, setFotos] = useState({ perfil: null, rg: null, residencia: null });
    const [errors, setErrors] = useState({});
    const [resetKey, setResetKey] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'senha' || name === 'confirmarSenha') setSenhaError(false);
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
        setSenhaError(false);
        setShowPassword(false);
        setResetKey(k => k + 1);
    };

    const validarFormulario = () => {
        const novosErros = {};
        if (!fotos.perfil)     novosErros.perfil     = "A foto de perfil é obrigatória";
        if (!fotos.rg)         novosErros.rg         = "A foto do RG é obrigatória";
        if (!fotos.residencia) novosErros.residencia = "O comprovante de residência é obrigatório";
        setErrors(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.senha !== formData.confirmarSenha) {
            setSenhaError(true);
            alert("As senhas não conferem!");
            return;
        }
        if (!formData.captcha) {
            alert("Por favor, confirme que você não é um robô.");
            return;
        }
        if (!validarFormulario()) {
            alert("Por favor, adicione todas as fotos obrigatórias.");
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append("nomeCompleto",   formData.nomeCompleto);
        dataToSend.append("cpf",            formData.cpf);
        dataToSend.append("rg",             formData.rg);
        dataToSend.append("sexo",           formData.sexo);
        dataToSend.append("dataNascimento", formData.dataNascimento ? formData.dataNascimento.format('DD/MM/YYYY') : "");
        dataToSend.append("telefone",       formData.telefone);
        dataToSend.append("email",          formData.email);
        dataToSend.append("senha",          formData.senha);
        dataToSend.append("confirmacaoSenha", formData.confirmarSenha);
        dataToSend.append("endereco", JSON.stringify({
            rua:         formData.rua,
            numero:      formData.numero,
            cep:         formData.cep,
            bairro:      formData.bairro,
            cidade:      formData.cidade,
            complemento: formData.complemento,
        }));

        if (fotos.perfil)     dataToSend.append("perfilFoto",    fotos.perfil);
        if (fotos.rg)         dataToSend.append("rgFoto",         fotos.rg);
        if (fotos.residencia) dataToSend.append("residenciaFoto", fotos.residencia);

        try {
            await api.post('/usuarios', dataToSend);
            alert("Usuário cadastrado com sucesso!");
            handleCancel();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
            alert(`Erro: ${mensagem}`);
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
                            <FormControl sx={{ mt: -1, width: '460px', mb: 2 }} variant="outlined">
                                <InputLabel>Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="senha" value={formData.senha} onChange={handleChange}
                                    error={senhaError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha" sx={{ height: "50px" }}
                                />
                            </FormControl>

                            <FormControl sx={{ mt: -1, width: '460px', mb: 2 }} variant="outlined">
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange}
                                    error={senhaError}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirmar Senha" sx={{ height: "50px" }}
                                />
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
                        </Box>
                    </Grid>

                    <BotaoCadastrar onCancel={handleCancel} />
                </form>
            </Box>
        </Box>
    );
}

export default CadastroUsuarios;