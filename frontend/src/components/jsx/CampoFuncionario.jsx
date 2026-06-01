import PerfilCadastros from '../../assets/PerfilCadastros.png'; 
import react, { useState } from 'react';
import { Box, Typography, Grid, Button } from "@mui/material";
import "../css/Funcionario.css";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 

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


function CampoFuncionario() {
    const [perfilImg, setPerfilImg] = useState(PerfilCadastros);
    
    const handleFileChange = (event) => { 
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPerfilImg(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };
  
    return (
        <>
            <Grid container justifyContent="center" sx={{mt:3}}>
                <Box  className="foto-barra" >
                    <Typography className='foto-texto' sx={{ml: 65}}>
                        Foto de Perfil
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="foto-box" sx={{mt:1}} >
                            <Typography variant="h6" sx={{ color: "#666", fontWeight: "300", ml:20, mt:5}}>
                                Selecionar Foto
                            </Typography>
                            <Box component="img" src={PerfilCadastros} alt="Perfil" className='foto-img' />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                disableElevation
                                className="botaoPerfilUm "
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

export default CampoFuncionario;