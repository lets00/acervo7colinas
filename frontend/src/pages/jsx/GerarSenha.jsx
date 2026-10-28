import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../../components/jsx/Header.jsx";
import "../css/EsqueciSenha.css";

function FazerNovaSenha() {
    function Submit(e) {
        e.preventDefault();
        console.log("Enviou no seu E-mail");
    }

    return (
        <Box className="forgot-page">
            <Header />
            <Box component="main" className="forgot-content">
                <Box className="forgot-heading">
                    <Typography component="h1" className="forgot-title">Gerar Nova Senha</Typography>
                </Box>
                <Box className="forgot-banner">
                    <Typography>
                        Recebemos seu pedido de redefinição de senha. Informe abaixo a sua nova senha para alterar a senha atual.
                    </Typography>
                </Box>
                <Box component="form" onSubmit={Submit} className="forgot-form">
                    <TextField fullWidth label="Nova Senha" type="password" autoComplete="new-password" variant="outlined" size="small" />
                    <TextField fullWidth label="Confirmar Nova Senha" type="password" autoComplete="new-password" variant="outlined" size="small" />
                    <Button type="submit" variant="contained" className="forgot-submit">GERAR NOVA SENHA</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default FazerNovaSenha;
