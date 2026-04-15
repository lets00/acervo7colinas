import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import Header from "../../components/jsx/Header.jsx";
import Voltar from  "../../assets/Voltar.png";
import "../css/EsqueciSenha.css";

function FazerNovaSenha() {
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
                    className="titulo" sx={{mt: 3, ml:-5}} >
                    Esqueci minha senha
                </Typography>
                <Box className="faixa-senha"   sx={{mt: 6}} >
                    <Typography className="textoFaixa" sx={{ml:25}} >
                        Enviamos um e-mail para o (E-MAIL do usuário) com as instruções para redefinir sua senha.
                        Caso não receba o e-mail em alguns minutos, verifique sua caixa de spam ou repita o processo.
                    </Typography>
                </Box>
                <form onSubmit={Submit} >
                    <Button type="submit"  variant="contained" className="btn-cadastrar" sx={{color:"#ffff", mt:4}} >
                    IR PARA LOGIN   
                    </Button>               
                </form>
            </Box>
        </div>
    )
};

export default FazerNovaSenha;