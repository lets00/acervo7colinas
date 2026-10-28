import React, { useState, useEffect, useCallback } from "react"; 
import { Box, Typography, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

function CampoEntregador({ onFileChange = () => {}, errors = {}, resetKey }) {
    const [perfilPreview, setPerfilPreview] = useState(null);
    const [cnhPreview, setCnhPreview] = useState(null);

    useEffect(() => {
        setPerfilPreview(null);
        setCnhPreview(null);
    }, [resetKey]);

    useEffect(() => {
        return () => { if (perfilPreview) URL.revokeObjectURL(perfilPreview); };
    }, [perfilPreview]);
 
    useEffect(() => {
        return () => { if (cnhPreview) URL.revokeObjectURL(cnhPreview); };
    }, [cnhPreview]);
 
    const handleFileChange = useCallback((event, tipo) => {
        const file = event.target.files[0];
        if (!file) return;
 
        const url = URL.createObjectURL(file);
 
        if (tipo === 'perfilFoto') {
            setPerfilPreview(url);
        } else if (tipo === 'cnhFoto') {
            setCnhPreview(url);
        }

        onFileChange(file, tipo);
    }, [onFileChange]);

    return (
        <Box className="delivery-upload-grid">
            {[
                { tipo: 'perfilFoto', titulo: 'Foto de perfil', imagem: perfilPreview || PerfilCadastros },
                { tipo: 'cnhFoto', titulo: 'Foto da CNH', imagem: cnhPreview || CNH },
            ].map(({ tipo, titulo, imagem }) => (
                <Box key={tipo} className="delivery-upload-card">
                    <Typography component="h3">{titulo}</Typography>
                    <img src={imagem} alt={titulo} className="delivery-upload-preview" />
                    <Button component="label" variant="contained" disableElevation startIcon={<CloudUploadIcon />}>
                        SELECIONAR FOTO
                        <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, tipo)} accept="image/*" />
                    </Button>
                    {errors[tipo] && <Typography color="error" variant="caption">{errors[tipo]}</Typography>}
                </Box>
            ))}
        </Box>
    );
}

export default CampoEntregador;
