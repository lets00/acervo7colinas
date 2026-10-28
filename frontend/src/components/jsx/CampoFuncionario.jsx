import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
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
    <Box className="staff-upload-card">
      <Typography component="h3">Selecionar foto de perfil</Typography>
      <img src={perfilPreview || PerfilCadastros} alt="Prévia da foto de perfil" className="staff-upload-preview" />
      <Button component="label" variant="contained" disableElevation startIcon={<CloudUploadIcon />}>
        SELECIONAR FOTO
        <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, 'perfil')} accept="image/*" />
      </Button>
      {errors.perfil && <Typography color="error" variant="caption">{errors.perfil}</Typography>}
    </Box>
  );
}

export default CampoFuncionario;
