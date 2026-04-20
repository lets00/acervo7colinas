import React, { useState } from "react";
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

function CampoEntregador() {
   
  const [perfilImg, setPerfilImg] = useState(PerfilCadastros);
  const [cnhImg, setCnhImg] = useState(CNH);

  const handleFileChange = (event, tipo) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (tipo === 'perfil') {
          setPerfilImg(reader.result);
        } else {
          setCnhImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
      
    }
  };
    return (
        <>
            <Grid container justifyContent="center" >
                <Box className="boxTituloPerfil">
                    <Typography className="textoTituloPerfil" sx={{ml:32}}>
                        Foto de Perfil
                    </Typography>
                </Box>
                <Box className="boxTituloCNH" >
                    <Typography className="textoTituloCNH" sx={{ml:16}}>
                        Foto da CNH
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card" sx={{mt:1}}>
                            <Typography className="textoCard textoPerfil" >
                                Selecionar Foto
                            </Typography>
                            <Box component="img" src={PerfilCadastros} alt="Perfil" className="imgPerfil" />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                disableElevation
                                className="botaoPerfil"
                                startIcon={<CloudUploadIcon />}
                            >
                                SELECIONAR FOTO
                                <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}  
                                accept="image/*"
                                />
                            </Button>
                    </Box>
                    <Box className="card" sx={{mt:1}}>
                            <Typography className="textoCard textoCNH" >
                                Selecionar Foto do RG
                            </Typography>
                            <Box component="img" src={CNH} alt="CNH" className="imgCNH" />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                disableElevation
                                className="botaoCNH"
                                startIcon={<CloudUploadIcon />}
                            >
                                SELECIONAR FOTO
                                <VisuallyHiddenInput
                                type="file"
                                onChange={handleFileChange}  
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