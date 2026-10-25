import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../../components/jsx/Header.jsx";
import "../css/EsqueciSenha.css";

function EsqueciSenha() {
    function Submit(e) {
        e.preventDefault();
        console.log("Enviou no seu E-mail");
    }

    return (
        <Box className="forgot-page">
            <Box className="forgot-header"><Header /></Box>
            <Box component="main" className="forgot-content">
                <Box className="forgot-heading">
                    <Typography component="h1" className="forgot-title">Esqueci Minha Senha</Typography>
                </Box>
                <Box className="forgot-banner">
                    <Typography>Para redefinir sua senha, por favor digite o endereço de e-mail da sua conta.</Typography>
                </Box>
                <Box component="form" onSubmit={Submit} className="forgot-form">
                    <TextField fullWidth label="Email" type="email" autoComplete="email" variant="outlined" size="small" />
                    <Button type="submit" variant="contained" className="forgot-submit">REDEFINIR MINHA SENHA</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default EsqueciSenha;
