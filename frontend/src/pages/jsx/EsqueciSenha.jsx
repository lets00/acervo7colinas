import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../../components/jsx/Header.jsx";
import Voltar from  "../../assets/Voltar.png";
import "../css/EsqueciSenha.css";

function EsqueciSenha() {
    function Submit(e) {
        e.preventDefault();
        console.log("Enviou no seu E-mail");
    }
    return (
        <div>
            <Box className="container"  > 
                <Header />
                <Box component="img" src={Voltar} alt="Voltar" sx={{ml:-158, mt:4, width: '30px', height: '30px' }} />
                <Typography variant="h6" sx={{mt:-3.5, ml:-145, color: '#312783'}} >
                    Voltar
                </Typography>
                <Typography
                    variant="h4"
                    align="center"
                    className="titulo" sx={{mt: 1, ml:-5}} >
                    Esqueci minha senha
                </Typography>
                <Box className="faixa-senha"   sx={{mt: 6}} >
                    <Typography className="textoFaixa" sx={{ml:25}} >
                        Para Redefinir sua senha, por favor digite o endereço de e-mail da sua conta.
                    </Typography>
                </Box>
                <form onSubmit={Submit} >
                    <TextField label="E-mail" variant="outlined" size="small" sx={{ mt: 2, width: '950px' }} />
                    <Button type="submit"  variant="contained" className="btn-cadastrar" sx={{color:"#ffff", mt:4}} >
                    REDEFINIR MINHA SENHA
                    </Button>               
                </form>
            </Box>
        </div>
    )
};

export default EsqueciSenha;