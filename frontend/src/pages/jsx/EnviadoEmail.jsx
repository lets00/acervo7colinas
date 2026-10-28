import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/jsx/Header.jsx";
import "../css/EsqueciSenha.css";

function FazerNovaSenha() {
    return (
        <Box className="forgot-page">
            <Header />
            <Box component="main" className="forgot-content">
                <Box className="forgot-heading">
                    <Typography component="h1" className="forgot-title">Esqueci minha senha</Typography>
                </Box>
                <Box className="forgot-banner">
                    <Typography>
                        Enviamos um e-mail para o (E-MAIL do usuário) com as instruções para redefinir sua senha.
                        Caso não receba o e-mail em alguns minutos, verifique sua caixa de spam ou repita o processo.
                    </Typography>
                </Box>
                <Box className="forgot-form">
                    <Button component={Link} to="/login" variant="contained" className="forgot-submit">IR PARA LOGIN</Button>
                </Box>
            </Box>
        </Box>
    );
}

export default FazerNovaSenha;
