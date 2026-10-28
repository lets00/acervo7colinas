import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
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
import { comprimirFotoPerfil, salvarFotoPerfil } from "../../utils/fotoPerfil";

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
            const fotoPerfilComprimida = fotoPerfil
                ? await comprimirFotoPerfil(fotoPerfil)
                : null;

            await api.post('/usuarios', formDataToSend);

            let mensagemSucesso = "Usuário cadastrado com sucesso!";
            if (fotoPerfilComprimida) {
                try {
                    salvarFotoPerfil(formData.email, fotoPerfilComprimida);
                } catch (error) {
                    console.error("Erro ao salvar foto do perfil:", error);
                    mensagemSucesso += " Não foi possível guardar a foto neste navegador.";
                }
            }

            alert(mensagemSucesso);

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

            const mensagem = error.response?.data?.mensagem
                || (!error.response && error.message)
                || "Erro ao conectar com o servidor.";
            alert(`Erro: ${mensagem}`);
        }
    }

    return (
        <Box className="users-register-page">
            <Header />
            <Box component="main" className="users-register-content">
                <Typography component="h1" className="users-register-title">Cadastro dos Usuários</Typography>
                <Box component="form" onSubmit={handleSubmit} className="users-register-form">
                    <Typography component="h2" className="users-register-section">Cadastro dos dados</Typography>
                    <Box className="users-register-fields">
                        <TextField className="users-register-wide" required fullWidth name="nomeCompleto" label="Nome Completo" value={formData.nomeCompleto} onChange={handleChange} size="small" />
                        {[
                            ['cpf', 'CPF'], ['rg', 'RG'], ['sexo', 'Sexo'],
                        ].map(([name, label]) => (
                            <TextField key={name} required fullWidth name={name} label={label} value={formData[name]} onChange={handleChange} size="small" />
                        ))}
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DatePicker label="Data de Nascimento" views={['year', 'month', 'day']} format="DD/MM/YYYY" value={formData.dataNascimento} onChange={(value) => setFormData(prev => ({ ...prev, dataNascimento: value }))} slotProps={{ textField: { fullWidth: true, required: true, size: 'small' } }} />
                        </LocalizationProvider>
                        <TextField required fullWidth name="email" label="Email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} size="small" />
                        <TextField required fullWidth name="telefone" label="Telefone" type="tel" autoComplete="tel" value={formData.telefone} onChange={handleChange} size="small" />
                        {[
                            ['senha', 'Senha'], ['confirmarSenha', 'Confirmar Senha'],
                        ].map(([name, label]) => (
                            <TextField key={name} fullWidth name={name} label={label} type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={formData[name]} onChange={handleChange} size="small" error={senhaError} helperText={senhaError ? 'As senhas não conferem.' : ''} InputProps={{ endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ) }} />
                        ))}
                    </Box>
                    <Typography component="h2" className="users-register-section">Endereço</Typography>
                    <Box className="users-register-fields">
                        {[
                            ['rua', 'Rua'], ['numero', 'Número'], ['cep', 'CEP'], ['bairro', 'Bairro'],
                        ].map(([name, label]) => (
                            <TextField key={name} required fullWidth name={name} label={label} value={formData[name]} onChange={handleChange} size="small" />
                        ))}
                        <FormControl required fullWidth size="small">
                            <InputLabel id="select-cidade-label">Cidade</InputLabel>
                            <Select labelId="select-cidade-label" name="cidade" value={formData.cidade} onChange={handleChange} label="Cidade">
                                <MenuItem value="Garanhuns">Garanhuns</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField required fullWidth name="complemento" label="Complemento" value={formData.complemento} onChange={handleChange} size="small" />
                    </Box>
                    <CampoUsuario onFileChange={(file, tipo) => {
                        if (tipo === 'perfil') setFotoPerfil(file);
                        if (tipo === 'rg') setFotoRg(file);
                        if (tipo === 'residencia') setComprovanteResidencial(file);
                    }} />
                    <Box className="users-register-captcha">
                        <FormControlLabel control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />} label="Não sou robô" />
                    </Box>
                    <BotaoCadastrar />
                </Box>
            </Box>
        </Box>
    );
}

export default CadastroUsuarios;
