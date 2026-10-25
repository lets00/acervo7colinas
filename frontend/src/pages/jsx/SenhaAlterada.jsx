import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../../components/jsx/Header.jsx";
import CheckMark from "../../assets/CheckMark.png";
import Multiply from "../../assets/Multiply.png";
import "../css/SenhaAlterada.css";

export default function SenhaAlterada() {
  return (
    <Box className="password-success-page">
      <Header />
      <Box component="main" className="password-success-content">
        <Box component="section" className="password-success-card" aria-labelledby="password-success-title">
          <IconButton component={Link} to="/login" aria-label="Fechar e voltar ao login" className="password-success-close">
            <img src={Multiply} alt="" />
          </IconButton>
          <img src={CheckMark} alt="" className="password-success-icon" />
          <Typography component="h1" id="password-success-title" className="password-success-title">Atenção</Typography>
          <Typography className="password-success-message">Senha alterada com sucesso!</Typography>
          <Button component={Link} to="/login" variant="contained" className="password-success-button">OK, voltar</Button>
        </Box>
      </Box>
    </Box>
  );
}
