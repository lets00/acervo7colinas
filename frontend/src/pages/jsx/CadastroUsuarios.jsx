import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box,
    Typography,
    TextField,
    Grid,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    OutlinedInput,
    IconButton
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
import { useNavigate } from "react-router-dom";

dayjs.locale('pt-br');

function CadastroUsuarios() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
    });

    const [showPassword, setShowPassword] = useState(false);
    const [senhaError, setSenhaError] = useState(false);

    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoRg, setFotoRg] = useState(null);
    const [comprovanteResidencial, setComprovanteResidencial] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'senha' || name === 'confirmarSenha') {
            setSenhaError(false);
        }
    };

    const handleCaptchaChange = (e) => {
        setFormData(prev => ({ ...prev, captcha: e.target.checked }));
    };

    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseUpPassword = (event) => event.preventDefault();

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !formData.nomeCompleto ||
            !formData.cpf ||
            !formData.rg ||
            !formData.sexo ||
            !formData.dataNascimento ||
            !formData.email ||
            !formData.telefone ||
            !formData.rua ||
            !formData.numero ||
            !formData.cep ||
            !formData.bairro ||
            !formData.cidade ||
            !formData.complemento
        ) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            setSenhaError(true);
            alert("As senhas não conferem!");
            return;
        }

        if (!formData.captcha) {
            alert("Por favor, confirme que você não é um robô.");
            return;
        }

        const formDataToSend = new FormData();

        formDataToSend.append('nomeCompleto', formData.nomeCompleto);
        formDataToSend.append('cpf', formData.cpf);
        formDataToSend.append('rg', formData.rg);
        formDataToSend.append('sexo', formData.sexo);
        formDataToSend.append(
            'dataNascimento',
            formData.dataNascimento ? formData.dataNascimento.format('DD/MM/YYYY') : ''
        );
        formDataToSend.append('telefone', formData.telefone);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('senha', formData.senha);
        formDataToSend.append('confirmacaoSenha', formData.confirmarSenha);
        formDataToSend.append('captcha', formData.captcha);

        formDataToSend.append('endereco[rua]', formData.rua);
        formDataToSend.append('endereco[numero]', formData.numero);
        formDataToSend.append('endereco[cep]', formData.cep);
        formDataToSend.append('endereco[bairro]', formData.bairro);
        formDataToSend.append('endereco[cidade]', formData.cidade);
        formDataToSend.append('endereco[complemento]', formData.complemento);

        if (fotoPerfil) {
            formDataToSend.append('fotoPerfil', fotoPerfil);
        }

        if (fotoRg) {
            formDataToSend.append('fotoRg', fotoRg);
        }

        if (comprovanteResidencial) {
            formDataToSend.append('comprovanteResidencial', comprovanteResidencial);
        }

        try {
            await api.post('/usuarios', formDataToSend);

            alert("Usuário cadastrado com sucesso!");

            setFormData({
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
            });

            setFotoPerfil(null);
            setFotoRg(null);
            setComprovanteResidencial(null);

            navigate("/login");

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            console.log("ERRO DO BACKEND:", error.response?.data);

            const mensagem = error.response?.data?.mensagem || "Erro ao conectar com o servidor.";
            alert(`Erro: ${mensagem}`);
        }
    }

    return (
        <Box className="container">
            <Header />

            <Box className="content" sx={{ mt: 0.5 }}>
                <Typography
                    variant="h4"
                    align="center"
                    className="titulo"
                    sx={{ mt: 3 }}
                >
                    Cadastro Dos Usuários!
                </Typography>

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', width: '1200px', padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                    <Typography className="faixa-text">
                        Cadastro Dos Dados:
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box className="input-grande">
                        <TextField
                            required
                            name="nomeCompleto"
                            fullWidth
                            label="Nome Completo"
                            variant="outlined"
                            value={formData.nomeCompleto}
                            onChange={handleChange}
                            size="small"
                            sx={{ maxWidth: '950px', mx: 'auto', mb: 2 }}
                        />
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
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
                                        required
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
                                            format="DD/MM/YYYY"
                                            sx={{ width: "460px" }}
                                            value={formData.dataNascimento}
                                            onChange={(value) => setFormData({ ...formData, dataNascimento: value })}
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

                        <Grid item xs={12} md={12}>
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={4}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Telefone"
                                        variant="outlined"
                                        size="small"
                                        placeholder="(00) 00000-0000"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleChange}
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
                                    label="Senha"
                                    sx={{ height: "50px" }}
                                />
                            </FormControl>

                            <FormControl sx={{ mt: -1, width: '460px', mb: 2 }} variant="outlined">
                                <InputLabel>Confirmar Senha</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
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

                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', width: '1200px', padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                        <Typography className="faixa-text">
                            Endereço
                        </Typography>
                    </Box>

                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Rua"
                                        size="small"
                                        sx={{ width: "794px", mt: 2 }}
                                        name="rua"
                                        value={formData.rua}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Numero"
                                        size="small"
                                        sx={{ width: "120px", mt: 2 }}
                                        name="numero"
                                        value={formData.numero}
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
                                        label="CEP"
                                        size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="cep"
                                        value={formData.cep}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Bairro"
                                        size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="bairro"
                                        value={formData.bairro}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <FormControl required fullWidth size="small" sx={{ width: "460px", mt: 1 }}>
                                        <InputLabel id="select-cidade-label">Cidade</InputLabel>
                                        <Select
                                            labelId="select-cidade-label"
                                            id="select-cidade"
                                            name="cidade"
                                            value={formData.cidade}
                                            onChange={handleChange}
                                            label="Cidade"
                                        >
                                            <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Complemento"
                                        size="small"
                                        sx={{ width: "460px", mt: 1 }}
                                        name="complemento"
                                        value={formData.complemento}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <CampoUsuario
                        onFileChange={(file, tipo) => {
                            if ( tipo === 'perfil') setFotoPerfil(file);
                            if ( tipo === 'rg') setFotoRg(file);
                            if ( tipo === 'residencia') setComprovanteResidencial(file);
                        }}
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

                    <BotaoCadastrar />
                </form>
            </Box>
        </Box>
    );
}

export default CadastroUsuarios;