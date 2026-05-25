import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box, Typography, TextField, Grid, FormLabel, RadioGroup,
    InputAdornment, FormControl, InputLabel, Select, MenuItem,
    Checkbox, FormControlLabel, OutlinedInput, IconButton, Radio
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (event, tipo) => {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        if (tipo === 'perfilFoto') {
            setPerfilPreview(previewUrl);
        } else if (tipo === 'cnhFoto') {
            setCnhPreview(previewUrl);
        }
    };

    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
    };

    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, dataNascimento: newValue }));
    };

    const gerarMatricula = (cpf) => {
        const base = cpf ? cpf.replace(/\D/g, '') : '';
        return base ? `ENT-${base.slice(-6)}` : `ENT-${Date.now()}`;
    };

    const handleCancel = () => {
        setFormData(initialState);
        setPerfilPreview(null);
        setCnhPreview(null);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.senha !== formData.confirmacaoSenha) return alert("As senhas não conferem!");
        if (!formData.captcha) return alert("Confirme o captcha!");

        const payload = {
            nomeCompleto: formData.nomeCompleto,
            cpf: formData.cpf,
            rg: formData.rg,
            sexo: formData.sexo,
            dataNascimento: formData.dataNascimento ? dayjs(formData.dataNascimento).format('YYYY-MM-DD') : null,
            matricula: gerarMatricula(formData.cpf),
            cargo: 'Entregador',
            setor: 'Entrega',
            email: formData.email,
            telefone: formData.telefone,
            tipoAcesso: formData.tipoAcesso,
            disponibilidade: formData.disponibilidade,
            tipoEntrega: formData.tipoEntrega,
            placa: formData.placa,
            tipoBicicleta: formData.tipoBicicleta,
            espacoBicicleta: formData.espacoBicicleta,
            endereco: {
                rua: formData.rua,
                numero: formData.numero,
                cep: formData.cep,
                bairro: formData.bairro,
                cidade: formData.cidade,
                complemento: formData.complemento,
            },
            senha: formData.senha,
            confirmacaoSenha: formData.confirmacaoSenha,
            captcha: formData.captcha
        };

        try {
            await api.post('/funcionarios', payload);
            alert("Sucesso!");
            setFormData(initialState);
            setPerfilPreview(null);
            setCnhPreview(null);
        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar.");
        }
    }
    return (
        <Box className="container">
            <Header />
            <Box sx={{ p: 3 }} className="content">
                <Typography
                    variant="h4"
                    align="center"
                     className="titulo"
                    sx={{ mt: 3 }}
                >
                    Cadastro Dos Entregadores!
                </Typography>

                <Box className="faixa-entrega" sx={{ mt: 3 }}>
                    <Typography className="textoFaixa">
                        Cadastro Dos Dados:
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box className="inputGrande">
                        <TextField
                            required
                            fullWidth
                            name="nomeCompleto"
                            label="Nome Completo"
                            variant="outlined"
                            size="small"
                            sx={{ mt: 2 }}
                            value={formData.nomeCompleto}
                            onChange={handleChange}
                        />
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="CPF"
                                        size="small"
                                        sx={{ width: "460px" }}
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="RG"
                                        size="small"
                                        sx={{ width: "460px" }}
                                        name="rg"
                                        value={formData.rg}
                                        onChange={handleChange}
                                    />
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
                                        sx={{ width: "460px" }}
                                        name="sexo"
                                        value={formData.sexo}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                        <DatePicker
                                            label="Data de Nascimento"
                                            views={['year', 'month', 'day']}
                                            format="YYYY-MM-DD"
                                            sx={{ width: "460px" }}
                                            value={formData.dataNascimento}
                                            onChange={handleDateChange}
                                            slotProps={{
                                                textField: {
                                                    name: "dataNascimento",
                                                    fullWidth: true,
                                                    required: true,
                                                    size: "small",
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <TextField
                            required
                            fullWidth
                            name="telefone"
                            label="Número"
                            variant="outlined"
                            size="small"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="Telefone"
                            helperText="Propostas serão enviadas para este número via WhatsApp"
                            sx={{
                                maxWidth: '950px', mb: 2, mx: 'auto',
                                '& .MuiFormHelperText-root': { marginLeft: 0, color: '#666' }
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

                        <Grid container spacing={4}>
                            <FormControl sx={{ mt: -1, width: '460px' }} variant="outlined">
                                <InputLabel>Senha</InputLabel>
                                <OutlinedInput
                                    name="senha"
                                    type={showPassword ? 'text' : 'password'}
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
                                    label="Senha"
                                    sx={{ height: "50px" }}
                                />
                            </FormControl>

                            <FormControl sx={{ mt: -1, width: '460px' }} variant="outlined">
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    name="confirmacaoSenha"
                                    type={showPassword ? 'text' : 'password'}
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
                                    label="Confirmar Senha"
                                    sx={{ height: "50px" }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className="faixa-entrega" sx={{ mt: 6 }}>
                        <Typography className="textoFaixa">
                            Endereço
                        </Typography>
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Rua" size="small"
                                        sx={{ width: "794px", mt: 2 }}
                                        name="rua" value={formData.rua} onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Número" size="small"
                                        sx={{ width: "120px", mt: 2 }}
                                        name="numero" value={formData.numero} onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="CEP" size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="cep" value={formData.cep} onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Bairro" size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="bairro" value={formData.bairro} onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small" sx={{ width: "460px", mt: 1 }}>
                                        <InputLabel id="select-cidade-label">Cidade</InputLabel>
                                        <Select
                                            name="cidade"
                                            value={formData.cidade}
                                            label="Cidade"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Complemento" size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="complemento" value={formData.complemento} onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Box className="faixa-entrega" sx={{ mt: 6 }}>
                        <Typography className="textoFaixa">
                            Informações da entrega!
                        </Typography>
                    </Box>

                    <Grid>
                        <Grid>
                            <FormControl sx={{ flexDirection: 'row', alignItems: 'center', mt: 3 }}>
                                <FormLabel sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} id="tipo-entrega-label">
                                    Tipo de Entrega:
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="tipo-entrega-label"
                                    name="tipoEntrega"
                                    value={formData.tipoEntrega}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Carro" control={<Radio />} label="Carro" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                    <FormControlLabel value="Moto" control={<Radio />} label="Moto" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                    <FormControlLabel value="Bicicleta" control={<Radio />} label="Bicicleta" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid>
                            <FormControl sx={{ flexDirection: 'row', alignItems: 'center', mt: 3 }}>
                                <FormLabel sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} id="disponibilidade-label">
                                    Disponibilidade:
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="disponibilidade-label"
                                    name="disponibilidade"
                                    value={formData.disponibilidade}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                    <FormControlLabel value="Inativo" control={<Radio />} label="Inativo" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid className="container-retangulo-um" sx={{ mt: 3, alignItems: 'center', ml: 25 }}>
                            <Typography sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif", mt: 3 }}>
                                Placa do Carro/Moto
                            </Typography>
                            <TextField
                                fullWidth label="Placa" size="small"
                                sx={{ width: "760px", mt: 1 }}
                                name="placa" value={formData.placa} onChange={handleChange}
                            />
                        </Grid>

                        <Grid className="container-retangulo" sx={{ mt: 4, alignItems: 'center', ml: 55 }}>
                            <Typography sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif", mt: 3 }}>
                                Bicicleta Informações
                            </Typography>
                            <Grid sx={{ mt: 2, alignItems: 'center', display: 'flex' }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="tipo-bicicleta-label"
                                    name="tipoBicicleta"
                                    value={formData.tipoBicicleta}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Bicicleta comum" control={<Radio />} label="Bicicleta comum" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                    <FormControlLabel value="Bicicleta elétrica" control={<Radio />} label="Bicicleta elétrica" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                </RadioGroup>
                            </Grid>
                            <Grid sx={{ mt: 2, alignItems: 'center', display: 'flex' }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="espaco-bicicleta-label"
                                    name="espacoBicicleta"
                                    value={formData.espacoBicicleta}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Pequena (Mochila)" control={<Radio />} label="Pequena (Mochila)" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                    <FormControlLabel value="Média (Caixa/Cesta)" control={<Radio />} label="Média (Caixa/Cesta)" sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif" }} />
                                </RadioGroup>
                            </Grid>
                        </Grid>
                    </Grid>

                    <CampoEntregador 
                        perfilImg={perfilPreview} 
                        cnhImg={cnhPreview} 
                        onFileChange={handleFileChange} 
                    />

                    <Grid container justifyContent="center" sx={{ mt: 6 }}>
                        <Box className="boxCaptcha">
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

export default CadastroEntregadores;