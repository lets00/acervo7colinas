import React, { useState } from "react"; 
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 

import PerfilCadastros from "../../assets/PerfilCadastros.png";
import RG from "../../assets/RG.jpeg";
import ComprovanteRes from "../../assets/ComprovanteRes.jpeg";

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

function CampoUsuario({ setFotoPerfil, setFotoRg, setComprovanteResidencial }) {
    const [perfilImg, setPerfilImg] = useState(PerfilCadastros);
    const [rgImg, setRgImg] = useState(RG); 
    const [residenciaImg, setResidenciaImg] = useState(ComprovanteRes);

    const handleFileChange = (event, tipo) => {
        const file = event.target.files[0];

        if (file) {
            if (tipo === 'perfil') setFotoPerfil(file);
            if (tipo === 'rg') setFotoRg(file);
            if (tipo === 'residencia') setComprovanteResidencial(file);

            const reader = new FileReader();

            reader.onloadend = () => {
                if (tipo === 'perfil') setPerfilImg(reader.result);
                if (tipo === 'rg') setRgImg(reader.result);
                if (tipo === 'residencia') setResidenciaImg(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Grid container justifyContent="center">
                <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', width: '1200px', padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                    <Typography className="textoTituloPerfil" sx={{ ml: 30 }}>
                        Foto de Perfil
                    </Typography>
                    <Typography className="textoTituloRG" sx={{ ml: 50, color: "#242424" }}>
                        Foto do RG
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card" sx={{ mt: 2 }}>
                        <Typography className="textoCard textoPerfil" sx={{ ml: 85 }}>
                            Selecionar Foto
                        </Typography>

                        <Box component="img" src={perfilImg} alt="Perfil" className="imgPerfil" />

                        <Button
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disableElevation
                            className="botaoPerfil"
                            startIcon={<CloudUploadIcon />}
                        >
                            SELECIONAR FOTO
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => handleFileChange(event, 'perfil')}
                                accept="image/*"
                            />
                        </Button>
                    </Box>

                    <Box className="card" sx={{ mt: 2 }}>
                        <Typography className="textoCard textoRG" sx={{ ml: 5, mt: 2 }}>
                            Selecionar Foto do RG
                        </Typography>

                        <Box component="img" src={rgImg} alt="RG" className="imgRG" sx={{ width: '200px', height: '220', mt: 4 }} />

                        <Button
                            sx={{ color: "#242424", backgroundColor: "#ccd3f8", ml: 5, mt: -5 }}
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disableElevation
                            startIcon={<CloudUploadIcon />}
                        >
                            SELECIONAR FOTO
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => handleFileChange(event, 'rg')}
                                accept="image/*"
                            />
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <Box sx={{ mt: 5, display: 'flex', alignItems: 'center', width: '1200px', padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box', backgroundColor: '#CCD3F8' }}>
                    <Typography className="texto-titulo-residencia" sx={{ color: "#333", ml: 55 }}>
                        Comprovante de Residência
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card" sx={{ mt: 2, width: '500px !important' }}>
                        <Typography className="text" sx={{ color: "#333", ml: 10 }}>
                            Selecionar Foto do Comprovante de Residência
                        </Typography>

                        <Box component="img" src={residenciaImg} alt="Residência" className="img-comprovante" sx={{ width: "200px", height: "150px", mt: 3 }} />

                        <Button
                            sx={{ color: "#242424", backgroundColor: "#ccd3f8", ml: 5, mt: -5 }}
                            component="label"
                            variant="contained"
                            tabIndex={-1}
                            disableElevation
                            startIcon={<CloudUploadIcon />}
                        >
                            SELECIONAR FOTO
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => handleFileChange(event, 'residencia')}
                                accept="image/*"
                            />
                        </Button>

                        <Typography className="texto-informativo" sx={{ color: "#666", mt: 4 }}>
                            Incluem contas de consumo (Água, Luz, Gás, Internet)
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CampoUsuario;