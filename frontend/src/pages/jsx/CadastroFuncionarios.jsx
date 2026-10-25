
import React, { useState } from "react";
import Header from "../../components/jsx/Header";
import { Box, Typography, TextField, InputAdornment, FormControl, Checkbox, FormControlLabel, IconButton, Radio, RadioGroup, FormLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../pages/css/Funcionarios.css";
import BotaoCadastrar from '../../components/jsx/BotaoCadastrar.jsx';
import CampoFuncionario from "../../components/jsx/CampoFuncionario.jsx";
import api from "../../services/apis";
import { useNavigate } from "react-router-dom";

function CadastroFuncionarios() {
    const [showPassword, setShowPassword] = useState(false);

    const [fotoPerfil, setFotoPerfil] = useState(null);

    const navigate = useNavigate();
 
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

            navigate("/login");
 
        } catch (error) {
            console.error("Erro detalhado:", error);
            const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
            alert(`Erro: ${mensagem}`);
            console.log("ERRO DO BACKEND:", error.response?.data);
        }
    }
    return (
        <Box className="staff-register-page">
            <Header />
            <Box component="main" className="staff-register-content">
                <Typography component="h1" className="staff-register-title">Cadastro dos Funcionários</Typography>
                <Box component="form" onSubmit={Submit} className="staff-register-form">
                    <Typography component="h2" className="staff-register-section">Cadastro dos dados</Typography>
                    <Box className="staff-register-fields">
                        <TextField className="staff-register-wide" required fullWidth name="nomeCompleto" label="Nome Completo" size="small" value={formData.nomeCompleto} onChange={handleChange} />
                        {[
                            ['cpf', 'CPF'], ['matricula', 'Matrícula'], ['cargo', 'Cargo'], ['setor', 'Setor/Área'],
                        ].map(([name, label]) => (
                            <TextField key={name} fullWidth name={name} label={label} size="small" value={formData[name]} onChange={handleChange} />
                        ))}
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
                    <Box className="staff-register-options">
                        <FormControl component="fieldset">
                            <FormLabel component="legend" id="tipo-acesso-label">Tipo de acesso</FormLabel>
                            <RadioGroup row aria-labelledby="tipo-acesso-label" name="tipoAcesso" value={formData.tipoAcesso} onChange={handleChange}>
                                <FormControlLabel value="Administrador" control={<Radio />} label="Administrador" />
                                <FormControlLabel value="Funcionário comum" control={<Radio />} label="Funcionário comum" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" id="disponibilidade-label">Disponibilidade</FormLabel>
                            <RadioGroup row aria-labelledby="disponibilidade-label" name="disponibilidade" value={formData.disponibilidade} onChange={handleChange}>
                                <FormControlLabel value="Ativo" control={<Radio />} label="Ativo" />
                                <FormControlLabel value="Inativo" control={<Radio />} label="Inativo" />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Typography component="h2" className="staff-register-section">Foto de perfil</Typography>
                    <CampoFuncionario onFileChange={(file) => setFotoPerfil(file)} />
                    <Box className="staff-register-captcha">
                        <FormControlLabel control={<Checkbox checked={formData.captcha} onChange={handleCaptchaChange} />} label="Não sou robô" />
                    </Box>
                    <BotaoCadastrar />
                </Box>
            </Box>
        </Box>
    );
}

export default CadastroFuncionarios;
