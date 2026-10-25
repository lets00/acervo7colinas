import React, { useState, useEffect, useCallback } from "react"; 
import { Box, Button, Typography } from "@mui/material";
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

function CampoUsuario({ onFileChange = () => {}, errors = {}, resetKey }) {
    const [perfilPreview, setPerfilPreview] = useState(null);
    const [rgPreview, setRgPreview] = useState(null);
    const [residenciaPreview, setResidenciaPreview] = useState(null);

    useEffect(() => {
        setPerfilPreview(null);
        setRgPreview(null);
        setResidenciaPreview(null);
    }, [resetKey]);

    useEffect(() => {
        return () => { if (perfilPreview) URL.revokeObjectURL(perfilPreview); };
    }, [perfilPreview]);

    useEffect(() => {
        return () => { if (rgPreview) URL.revokeObjectURL(rgPreview); };
    }, [rgPreview]);

    useEffect(() => {
        return () => { if (residenciaPreview) URL.revokeObjectURL(residenciaPreview); };
    }, [residenciaPreview]);

    const handleFileChange = useCallback((event, tipo) => {
        const file = event.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        if (tipo === 'perfil') setPerfilPreview(url);
        if (tipo === 'rg') setRgPreview(url);
        if (tipo === 'residencia') setResidenciaPreview(url);

        onFileChange(file, tipo);
    }, [onFileChange]);

    return (
        <Box className="users-upload-section">
            <Typography component="h2" className="users-register-section">Fotos e documentos</Typography>
            <Box className="users-upload-grid">
                {[
                    { tipo: 'perfil', titulo: 'Foto de perfil', imagem: perfilPreview || PerfilCadastros, texto: 'Selecionar foto', erro: errors.perfil },
                    { tipo: 'rg', titulo: 'Foto do RG', imagem: rgPreview || RG, texto: 'Selecionar foto do RG', erro: errors.rg },
                    { tipo: 'residencia', titulo: 'Comprovante de residência', imagem: residenciaPreview || ComprovanteRes, texto: 'Selecionar comprovante', erro: errors.residencia },
                ].map(({ tipo, titulo, imagem, texto, erro }) => (
                    <Box key={tipo} className="users-upload-card">
                        <Typography component="h3">{titulo}</Typography>
                        <img src={imagem} alt={titulo} className="users-upload-preview" />
                        <Button component="label" variant="contained" disableElevation startIcon={<CloudUploadIcon />}>
                            {texto}
                            <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, tipo)} accept="image/*" />
                        </Button>
                        {erro && <Typography color="error" variant="caption">{erro}</Typography>}
                        {tipo === 'residencia' && <Typography variant="caption">Incluem contas de consumo (Água, Luz, Gás, Internet)</Typography>}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default CampoUsuario;
