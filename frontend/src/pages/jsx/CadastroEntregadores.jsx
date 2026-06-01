import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box, Typography, TextField, Grid, FormLabel, RadioGroup,
    InputAdornment, FormControl, InputLabel, Select, MenuItem,
    Checkbox, FormControlLabel, OutlinedInput, IconButton, Radio,
    FormHelperText
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
    captcha: false
};

function CadastroEntregadores() {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fotos, setFotos] = useState({ perfilFoto: null, cnhFoto: null });
    const [errors, setErrors] = useState({});
    const [resetKey, setResetKey] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleFileChange = (file, tipo) => {
        if (!file) return;
        setFotos(prev => ({ ...prev, [tipo]: file }));
        setErrors(prev => ({ ...prev, [tipo]: null }));
    };
 
    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
    };
 
    const handleDateChange = (newValue) => {
        setFormData(prev => ({ ...prev, dataNascimento: newValue }));
    };

    const handleCancel = () => {
        setFormData(initialState);
        setFotos({ perfilFoto: null, cnhFoto: null });
        setErrors({});
        setShowPassword(false);
        setShowConfirmPassword(false);
        setStatusMessage({ type: '', text: '' });
        setResetKey(k => k + 1);
    };

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();
    const handleMouseUpPassword = (e) => e.preventDefault();

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
        if (!formData.confirmacaoSenha) novosErros.confirmacaoSenha = "Confirmação de senha é obrigatória";
        if (formData.senha && formData.confirmacaoSenha && formData.senha !== formData.confirmacaoSenha) {
            novosErros.confirmacaoSenha = "As senhas não conferem";
        }

        if (!formData.rua.trim()) novosErros.rua = "Rua é obrigatória";
        if (!formData.numero.trim()) novosErros.numero = "Número é obrigatório";
        if (!formData.cep.trim()) novosErros.cep = "CEP é obrigatório";
        if (!formData.bairro.trim()) novosErros.bairro = "Bairro é obrigatório";
        if (!formData.cidade.trim()) novosErros.cidade = "Cidade é obrigatória";
        if (!formData.complemento.trim()) novosErros.complemento = "Complemento é obrigatório";
        if (!fotos.perfilFoto) novosErros.perfilFoto = "A foto de perfil é obrigatória";
        if (!fotos.cnhFoto) novosErros.cnhFoto = "A foto da CNH é obrigatória";

        if ((formData.tipoEntrega === 'Carro' || formData.tipoEntrega === 'Moto') && !formData.placa.trim()) {
            novosErros.placa = "Placa é obrigatória para Carro e Moto";
        }
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

            const converterParaBase64 = (file) => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            const perfilBase64 = fotos.perfilFoto ? await converterParaBase64(fotos.perfilFoto) : null;
            const cnhBase64   = fotos.cnhFoto    ? await converterParaBase64(fotos.cnhFoto)    : null;

            const payload = {
                nomeCompleto:     formData.nomeCompleto.trim(),
                cpf:              formData.cpf.trim(),
                rg:               formData.rg.trim(),
                sexo:             formData.sexo,
                dataNascimento:   dayjs(formData.dataNascimento).format('DD/MM/YYYY'),
                email:            formData.email.trim(),
                telefone:         formData.telefone.trim(),
                senha:            formData.senha,
                confirmacaoSenha: formData.confirmacaoSenha,
                endereco: {
                    rua:         formData.rua.trim(),
                    numero:      formData.numero.trim(),
                    cep:         formData.cep.trim(),
                    bairro:      formData.bairro.trim(),
                    cidade:      formData.cidade.trim(),
                    complemento: formData.complemento.trim(),
                },
                tipoVeiculo:     formData.tipoEntrega,
                disponibilidade: formData.disponibilidade,
                placa:           formData.tipoEntrega !== 'Bicicleta' ? formData.placa.trim() : undefined,
                tipoBicicleta:   formData.tipoEntrega === 'Bicicleta' ? formData.tipoBicicleta : undefined,
                tamanhoBolsa:    formData.tipoEntrega === 'Bicicleta' ? formData.espacoBicicleta : undefined,
                fotoPerfil:      perfilBase64,
                fotoCnh:         cnhBase64,
                captcha:         formData.captcha,  // ← faltava esse!
            };

            await api.post('/entregadores', payload);

            setStatusMessage({ type: 'success', text: 'Entregador cadastrado com sucesso!' });
            setFormData(initialState);
            setFotos({ perfilFoto: null, cnhFoto: null });
            setErrors({});
            setShowPassword(false);
            setShowConfirmPassword(false);
            setResetKey(k => k + 1);

        } catch (error) {
            console.error('Erro na requisição:', error);
            console.error('Resposta do servidor:', error.response?.data);

            const mensagemErro =
                error.response?.data?.mensagem ||
                error.response?.data?.message ||
                'Erro ao conectar com o servidor.';

            setStatusMessage({
                type: 'error',
                text: mensagemErro
            });
        } finally {
            setIsSubmitting(false);
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
                                        error={Boolean(errors.cpf)}
                                        helperText={errors.cpf || ''}
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
                                        error={Boolean(errors.rg)}
                                        helperText={errors.rg || ''}
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
                                        error={Boolean(errors.sexo)}
                                        helperText={errors.sexo || ''}
                                    />
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
                                            slotProps={{
                                                textField: {
                                                    name: "dataNascimento",
                                                    fullWidth: true,
                                                    required: true,
                                                    size: "small",
                                                    error: Boolean(errors.dataNascimento),
                                                    helperText: errors.dataNascimento || ''
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
                            error={Boolean(errors.email)}
                            helperText={errors.email || ''}
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
                            error={Boolean(errors.telefone)}
                            helperText={errors.telefone || 'Propostas serão enviadas para este número via WhatsApp'}
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

                        <Grid container spacing={2} sx={{ mt: -1 }}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" size="small" sx={{width: '460px'}} error={!!errors.senha} required>
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
                                                    aria-label="Mostrar senha"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Senha"
                                    />
                                    {errors.senha && <FormHelperText>{errors.senha}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth variant="outlined" size="small" sx={{width: '460px'}} error={!!errors.confirmacaoSenha} required>
                                    <InputLabel>Confirmar Senha</InputLabel>
                                    <OutlinedInput
                                        name="confirmacaoSenha"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmacaoSenha}
                                        onChange={handleChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                    aria-label="Mostrar confirmação de senha"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirmar Senha"
                                    />
                                    {errors.confirmacaoSenha && <FormHelperText>{errors.confirmacaoSenha}</FormHelperText>}
                                </FormControl>
                            </Grid>
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
                                        error={Boolean(errors.rua)}
                                        helperText={errors.rua || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Número" size="small"
                                        sx={{ width: "120px", mt: 2 }}
                                        name="numero" value={formData.numero} onChange={handleChange}
                                        error={Boolean(errors.numero)}
                                        helperText={errors.numero || ''}
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
                                        error={Boolean(errors.cep)}
                                        helperText={errors.cep || ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Bairro" size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="bairro" value={formData.bairro} onChange={handleChange}
                                        error={Boolean(errors.bairro)}
                                        helperText={errors.bairro || ''}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl fullWidth size="small" sx={{ width: "460px", mt: 1 }} error={Boolean(errors.cidade)}>
                                        <InputLabel id="select-cidade-label">Cidade</InputLabel>
                                        <Select
                                            name="cidade"
                                            value={formData.cidade}
                                            label="Cidade"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                                        </Select>
                                        {errors.cidade && <FormHelperText>{errors.cidade}</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth label="Complemento" size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="complemento" value={formData.complemento} onChange={handleChange}
                                        error={Boolean(errors.complemento)}
                                        helperText={errors.complemento || ''}
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

                        {(formData.tipoEntrega === 'Carro' || formData.tipoEntrega === 'Moto') && (
                            <Grid className="container-retangulo-um" sx={{ mt: 3, alignItems: 'center', ml: 25 }}>
                                <Typography sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif", mt: 3 }}>
                                Placa do Carro/Moto
                                </Typography>
                                <TextField
                                    fullWidth label="Placa" size="small"
                                    sx={{ width: "760px", mt: 1 }}
                                    name="placa" value={formData.placa} onChange={handleChange}
                                    error={Boolean(errors.placa)}
                                    helperText={errors.placa || ''}
                                />
                            </Grid>
                        )}

                        {formData.tipoEntrega === 'Bicicleta' && (
                            <Grid className="container-retangulo" sx={{ mt: 4, alignItems: 'center', ml: 55 }}>
                                <Typography sx={{ color: "#242424", fontFamily: "'Roboto', sans-serif", mt: 3 }}>
                                Bicicleta Informações
                                </Typography>
                                <Grid sx={{ mt: 2, alignItems: 'center', display: 'flex' }}>
                                <RadioGroup
                                    row name="tipoBicicleta"
                                    value={formData.tipoBicicleta}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Bicicleta comum" control={<Radio />} label="Bicicleta comum" sx={{ color: "#242424" }} />
                                    <FormControlLabel value="Bicicleta elétrica" control={<Radio />} label="Bicicleta elétrica" sx={{ color: "#242424" }} />
                                </RadioGroup>
                                </Grid>
                                <Grid sx={{ mt: 2, alignItems: 'center', display: 'flex' }}>
                                <RadioGroup
                                    row name="espacoBicicleta"
                                    value={formData.espacoBicicleta}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="Pequena (Mochila)" control={<Radio />} label="Pequena (Mochila)" sx={{ color: "#242424" }} />
                                    <FormControlLabel value="Média (Caixa/Cesta)" control={<Radio />} label="Média (Caixa/Cesta)" sx={{ color: "#242424" }} />
                                </RadioGroup>
                                </Grid>
                            </Grid>
                        )}
                        </Grid>

                    <CampoEntregador
                        onFileChange={handleFileChange}
                        errors={errors}
                        resetKey={resetKey}
                    />

                    <Grid container justifyContent="center" sx={{ mt: 6 }}>
                        <Box className="boxCaptcha">
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

export default CadastroEntregadores;