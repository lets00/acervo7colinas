import React from "react"; // Removido o useState, pois não será usado aqui
import { Grid, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "../css/EntregadoresCampo.css";

import PerfilCadastros from '../../assets/PerfilCadastros.png'; 
import CNH from '../../assets/CNH.png';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

// Componente agora recebe apenas o necessário via props
function CampoEntregador({ perfilImg, cnhImg, onFileChange = () => {} }) {
    return (
        <>
            <Grid container justifyContent="center" >
                <Box className="boxTituloPerfil">
                    <Typography className="textoTituloPerfil" sx={{ ml: 32 }}>
                        Foto de Perfil
                    </Typography>
                </Box>
                <Box className="boxTituloCNH" >
                    <Typography className="textoTituloCNH" sx={{ ml: 16 }}>
                        Foto da CNH
                    </Typography>
                </Box>
            </Grid> 

            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    {/* CARD PERFIL */}
                    <Box className="card" sx={{ mt: 1 }}>
                        <Typography className="textoCard textoPerfil" >
                            Selecionar Foto
                        </Typography>
                        <Box 
                            component="img" 
                            src={perfilImg || PerfilCadastros} 
                            alt="Perfil" 
                            className="imgPerfil" 
                        />
                        <Button
                            component="label"
                            variant="contained"
                            disableElevation
                            className="botaoPerfil"
                            startIcon={<CloudUploadIcon />}
                        >
                            SELECIONAR FOTO
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => onFileChange(event, 'perfilFoto')}
                                accept="image/*"
                            />
                        </Button>
                    </Box>

                    {/* CARD CNH */}
                    <Box className="card" sx={{ mt: 1 }}>
                        <Typography className="textoCard textoCNH" >
                            Selecionar Foto da CNH
                        </Typography>
                        <Box 
                            component="img" 
                            src={cnhImg || CNH} 
                            alt="CNH" 
                            className="imgCNH" 
                        />
                        <Button
                            component="label"
                            variant="contained"
                            disableElevation
                            className="botaoCNH"
                            startIcon={<CloudUploadIcon />}
                        >
                            SELECIONAR FOTO
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => onFileChange(event, 'cnhFoto')}
                                accept="image/*"
                            />
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CampoEntregador;