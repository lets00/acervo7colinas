<<<<<<< HEAD
import React from "react"; 
=======
import React, { useState, useEffect, useCallback } from "react"; 
>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
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

<<<<<<< HEAD


function CampoEntregador({ perfilImg, cnhImg, onFileChange = () => {} }) {
=======
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
    }, [onFileChange])

>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
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
<<<<<<< HEAD
=======

>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
                    <Box className="card" sx={{ mt: 1 }}>
                        <Typography className="textoCard textoPerfil" >
                            Selecionar Foto
                        </Typography>
                        <Box 
                            component="img" 
                            src={perfilPreview || PerfilCadastros} 
                            alt="Perfil" 
                            className="imgPerfil" 
                            sx={{ objectFit: 'cover' }} 
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
                               onChange={(event) => handleFileChange(event, 'perfilFoto')}
                                accept="image/*"
                            />
                        </Button>
                        {errors.perfilFoto && (
                            <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>
                                {errors.perfilFoto}
                            </Typography>
                        )}
                    </Box>

                    <Box className="card" sx={{ mt: 1 }}>
                        <Typography className="textoCard textoCNH" >
                            Selecionar Foto da CNH
                        </Typography>
                        <Box 
                            component="img" 
                            src={cnhPreview || CNH} 
                            alt="CNH" 
                            className="imgCNH" 
                            sx={{ objectFit: 'cover' }} 
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
                                onChange={(event) => handleFileChange(event, 'cnhFoto')}
                                accept="image/*"
                            />
                        </Button>
                        {errors.cnhFoto && ( 
                            <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>
                                {errors.cnhFoto}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CampoEntregador;