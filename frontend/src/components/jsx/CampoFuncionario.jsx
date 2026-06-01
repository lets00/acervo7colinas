import React, { useState, useEffect, useCallback } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PerfilCadastros from '../../assets/PerfilCadastros.png';

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

function CampoFuncionario({ onFileChange = () => {}, errors = {}, resetKey }) {
  const [perfilPreview, setPerfilPreview] = useState(null);

  useEffect(() => {
    setPerfilPreview(null);
  }, [resetKey]);

  useEffect(() => {
    return () => { if (perfilPreview) URL.revokeObjectURL(perfilPreview); };
  }, [perfilPreview]);

  const handleFileChange = useCallback((event, tipo) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    if (tipo === 'perfil') setPerfilPreview(url);
    onFileChange(file, tipo);
  }, [onFileChange]);

  return (
    <>
      <Grid container justifyContent="center" sx={{mt:-6}}>
        <Box className="foto-barra" >

        </Box>
      </Grid> 
      <Grid item xs={12} md={6}>
        <Grid container spacing={5} justifyContent="center">
          <Box className="card" sx={{ mt: 2 }}>
              <Typography className="textoCard textoPerfil" sx={{ ml: 85 }}>
                  Selecionar Foto
              </Typography>
              
              <Box component="img" src={perfilPreview || PerfilCadastros} alt="Perfil" className="imgPerfil" />

              <Button 
                  component="label" 
                  variant="contained" 
                  tabIndex={-1} 
                  disableElevation 
                  className="botaoPerfil" 
                  startIcon={<CloudUploadIcon />}
              >
                  SELECIONAR FOTO
                  <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, 'perfil')} accept="image/*" />
              </Button>
              
              {errors.perfil && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {errors.perfil}
                  </Typography>
              )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
} 

export default CampoFuncionario;