import PerfilCadastros from '../../assets/PerfilCadastros.png'; 
import CNH from '../../assets/CNH.png';
import React from "react";
import { 
  Grid, Box, Typography, Button } from "@mui/material";
import "../css/EntregadoresCampo.css";

function CampoEntregador() {
    return (
        <>
            <Grid container justifyContent="center" >
                <Box className="boxTituloPerfil">
                    <Typography className="textoTituloPerfil">
                        Foto de Perfil
                    </Typography>
                </Box>
                <Box className="boxTituloCNH" >
                    <Typography className="textoTituloCNH">
                        Foto da CNH
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card">
                            <Typography className="textoCard textoPerfil" >
                                Selecionar Foto
                            </Typography>
                            <Box component="img" src={PerfilCadastros} alt="Perfil" className="imgPerfil" />
                            <Button variant="contained" disableElevation className="botaoPerfil">
                                SELECIONAR FOTO
                            </Button>
                    </Box>
                    <Box className="card">
                            <Typography className="textoCard textoCNH" >
                                Selecionar Foto do RG
                            </Typography>
                            <Box component="img" src={CNH} alt="CNH" className="imgCNH" />
                            <Button variant="contained" disableElevation className="botaoCNH">
                                SELECIONAR FOTO
                            </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CampoEntregador;