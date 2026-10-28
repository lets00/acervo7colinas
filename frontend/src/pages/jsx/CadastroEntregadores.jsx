import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box, Typography, TextField, FormLabel, RadioGroup,
    InputAdornment, FormControl, InputLabel, Select, MenuItem,
    Checkbox, FormControlLabel, IconButton, Radio
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import BotaoCadastrar from '../../components/jsx/BotaoCadastrar.jsx';
import api from "../../services/apis";
import "../css/Entregadores.css";
import CampoEntregador from "../../components/jsx/CampoEntregador.jsx";
import { useNavigate } from "react-router-dom";

dayjs.locale('pt-br');

const initialState = {
    nomeCompleto: '',
    cpf: '',
    rg: '',
    sexo: '',
    dataNascimento: null,
    email: '',
    telefone: '',
    senha: '',
    confirmacaoSenha: '',
    rua: '',
    numero: '',
    cep: '',
    bairro: '',
    cidade: 'Garanhuns',
    complemento: '',
    tipoEntrega: 'Moto',
    disponibilidade: 'Ativo',
    placa: '',
    tipoBicicleta: 'Bicicleta comum',
    espacoBicicleta: 'Pequena (Mochila)',
    tipoAcesso: 'Funcionário comum',
    captcha: false
};


function CadastroEntregadores() {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [perfilPreview, setPerfilPreview] = useState(null);
    const [cnhPreview, setCnhPreview] = useState(null);
    const [perfilFile, setPerfilFile] = useState(null);
    const [cnhFile, setCnhFile] = useState(null);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (file, tipo) => {
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);

        if (tipo === 'perfilFoto') {
            setPerfilPreview(previewUrl);
            setPerfilFile(file);
        } else if (tipo === 'cnhFoto') {
            setCnhPreview(previewUrl);
            setCnhFile(file);
        }
    };

    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
    };

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, dataNascimento: newValue }));
    };

    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();

    const gerarMatricula = (cpf) => {
        const base = cpf ? cpf.replace(/\D/g, '') : '';
        return base ? `ENT-${base.slice(-6)}` : `ENT-${Date.now()}`;
    };

    const handleCancel = () => {
        setFormData(initialState);
        setPerfilPreview(null);
        setCnhPreview(null);
        setPerfilFile(null);
        setCnhFile(null);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.senha !== formData.confirmacaoSenha) return alert("As senhas não conferem!");
        if (!formData.captcha) return alert("Confirme o captcha!");

        const formDataToSend = new FormData();

        formDataToSend.append('nomeCompleto', formData.nomeCompleto);
        formDataToSend.append('cpf', formData.cpf);
        formDataToSend.append('rg', formData.rg);
        formDataToSend.append('sexo', formData.sexo);
        formDataToSend.append(
            'dataNascimento',
            formData.dataNascimento
                ? dayjs(formData.dataNascimento).format('DD/MM/YYYY')
                : ''
        );
        formDataToSend.append('matricula', gerarMatricula(formData.cpf));
        formDataToSend.append('cargo', 'Entregador');
        formDataToSend.append('setor', 'Entrega');
        formDataToSend.append('email', formData.email);
        formDataToSend.append('telefone', formData.telefone);
        formDataToSend.append('tipoAcesso', formData.tipoAcesso);
        formDataToSend.append('disponibilidade', formData.disponibilidade);
        formDataToSend.append('senha', formData.senha);
        formDataToSend.append('confirmacaoSenha', formData.confirmacaoSenha);

        formDataToSend.append('tipoVeiculo', formData.tipoEntrega);    
        formDataToSend.append('tamanhoBolsa', formData.espacoBicicleta); 
        formDataToSend.append('placa', formData.placa);
        formDataToSend.append('tipoBicicleta', formData.tipoBicicleta);

        formDataToSend.append('rua', formData.rua);
        formDataToSend.append('numero', formData.numero);
        formDataToSend.append('cep', formData.cep);
        formDataToSend.append('bairro', formData.bairro);
        formDataToSend.append('cidade', formData.cidade);
        formDataToSend.append('complemento', formData.complemento);
        formDataToSend.append('captcha', formData.captcha);

        if (perfilFile) formDataToSend.append('fotoPerfil', perfilFile);
        if (cnhFile) formDataToSend.append('fotoCnh', cnhFile);

        try {
            await api.post('/entregadores', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Sucesso!");
            setFormData(initialState);
            setPerfilPreview(null);
            setCnhPreview(null);
            setPerfilFile(null);
            setCnhFile(null);

            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.");
            console.log("ERRO DO BACKEND:", error.response?.data);
        }
    }

    return (
        <Box className="delivery-register-page">
            <Header />
            <Box component="main" className="delivery-register-content">
                <Typography component="h1" className="delivery-register-title">Cadastro dos Entregadores</Typography>
                <Box component="form" onSubmit={handleSubmit} className="delivery-register-form">
                    <Typography component="h2" className="delivery-register-section">Cadastro dos dados</Typography>
                    <Box className="delivery-register-fields">
                        <TextField className="delivery-register-wide" required fullWidth name="nomeCompleto" label="Nome Completo" size="small" value={formData.nomeCompleto} onChange={handleChange} />
                        {['cpf', 'rg', 'sexo'].map((name) => (
                            <TextField key={name} fullWidth name={name} label={name === 'sexo' ? 'Sexo' : name.toUpperCase()} required={name === 'sexo'} size="small" value={formData[name]} onChange={handleChange} />
                        ))}
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DatePicker label="Data de Nascimento" views={['year', 'month', 'day']} format="YYYY-MM-DD" value={formData.dataNascimento} onChange={handleDateChange} slotProps={{ textField: { name: 'dataNascimento', fullWidth: true, required: true, size: 'small' } }} />
                        </LocalizationProvider>
                        <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" size="small" value={formData.email} onChange={handleChange} />
                        <TextField required fullWidth name="telefone" label="Telefone" type="tel" autoComplete="tel" size="small" value={formData.telefone} onChange={handleChange} />
                        {[
                            ['senha', 'Senha'], ['confirmacaoSenha', 'Confirmar Senha'],
                        ].map(([name, label]) => (
                            <TextField key={name} fullWidth name={name} label={label} type={showPassword ? 'text' : 'password'} autoComplete="new-password" size="small" value={formData[name]} onChange={handleChange} InputProps={{ endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ) }} />
                        ))}
                    </Box>
                    <Typography component="h2" className="delivery-register-section">Endereço</Typography>
                    <Box className="delivery-register-fields">
                        {[
                            ['rua', 'Rua'], ['numero', 'Número'], ['cep', 'CEP'], ['bairro', 'Bairro'],
                        ].map(([name, label]) => (
                            <TextField key={name} fullWidth name={name} label={label} value={formData[name]} onChange={handleChange} size="small" />
                        ))}
                        <FormControl fullWidth size="small">
                            <InputLabel id="delivery-city-label">Cidade</InputLabel>
                            <Select labelId="delivery-city-label" name="cidade" value={formData.cidade} onChange={handleChange} label="Cidade">
                                <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth name="complemento" label="Complemento" value={formData.complemento} onChange={handleChange} size="small" />
                    </Box>
                    <Typography component="h2" className="delivery-register-section">Informações de entrega</Typography>
                    <Box className="delivery-register-options">
                        {[
                            ['tipoEntrega', 'Tipo de entrega', ['Carro', 'Moto', 'Bicicleta']],
                            ['disponibilidade', 'Disponibilidade', ['Ativo', 'Inativo']],
                        ].map(([name, label, options]) => (
                            <FormControl key={name} component="fieldset">
                                <FormLabel component="legend" id={`delivery-${name}-label`}>{label}</FormLabel>
                                <RadioGroup row aria-labelledby={`delivery-${name}-label`} name={name} value={formData[name]} onChange={handleChange}>
                                    {options.map((value) => <FormControlLabel key={value} value={value} control={<Radio />} label={value} />)}
                                </RadioGroup>
                            </FormControl>
                        ))}
                    </Box>
                    <Box className="delivery-register-vehicle">
                        {formData.tipoEntrega !== 'Bicicleta' ? (
                            <TextField fullWidth name="placa" label="Placa" size="small" value={formData.placa} onChange={handleChange} />
                        ) : (
                            <Box className="delivery-register-options">
                                {[
                                    ['tipoBicicleta', 'Tipo de bicicleta', ['Bicicleta comum', 'Bicicleta elétrica']],
                                    ['espacoBicicleta', 'Espaço para entrega', ['Pequena (Mochila)', 'Média (Caixa/Cesta)']],
                                ].map(([name, label, options]) => (
                                    <FormControl key={name} component="fieldset">
                                        <FormLabel component="legend" id={`delivery-${name}-label`}>{label}</FormLabel>
                                        <RadioGroup aria-labelledby={`delivery-${name}-label`} name={name} value={formData[name]} onChange={handleChange}>
                                            {options.map((value) => <FormControlLabel key={value} value={value} control={<Radio />} label={value} />)}
                                        </RadioGroup>
                                    </FormControl>
                                ))}
                            </Box>
                        )}
                    </Box>
                    <Typography component="h2" className="delivery-register-section">Fotos e documentos</Typography>
                    <CampoEntregador perfilImg={perfilPreview} cnhImg={cnhPreview} onFileChange={handleFileChange} />
                    <Box className="delivery-register-captcha">
                        <FormControlLabel control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />} label="Não sou robô" />
                    </Box>
                    <BotaoCadastrar onCancel={handleCancel} />
                </Box>
            </Box>
        </Box>
    );
}

export default CadastroEntregadores;
