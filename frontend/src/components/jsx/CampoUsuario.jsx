import React, { useState, useEffect, useCallback } from "react"; 
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
<<<<<<< HEAD

function CampoUsuario({ setFotoPerfil, setFotoRg, setComprovanteResidencial }) {
    const [perfilImg, setPerfilImg] = useState(PerfilCadastros);
    const [rgImg, setRgImg] = useState(RG); 
    const [residenciaImg, setResidenciaImg] = useState(ComprovanteRes);
=======
function CampoUsuario({ onFileChange = () => {}, errors = {}, resetKey }) {
    const [perfilPreview, setPerfilPreview] = useState(null);
    const [rgPreview, setRgPreview] = useState(null);
    const [residenciaPreview, setResidenciaPreview] = useState(null);
>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6

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
<<<<<<< HEAD

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

=======
        if (!file) return;

        const url = URL.createObjectURL(file);

        if (tipo === 'perfil') setPerfilPreview(url);
        if (tipo === 'rg') setRgPreview(url);
        if (tipo === 'residencia') setResidenciaPreview(url);

        onFileChange(file, tipo);
    }, [onFileChange]);
>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
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
<<<<<<< HEAD
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
=======
                    <Box className="card" sx={{mt:2}}>
                            <Typography className="textoCard textoPerfil" sx={{ml:85}} >Selecionar Foto</Typography>
                            <Box component="img" src={perfilPreview || PerfilCadastros} alt="Perfil" className="imgPerfil" />
                            <Button component="label" role={undefined} variant="contained" tabIndex={-1} disableElevation className="botaoPerfil" startIcon={<CloudUploadIcon />}>
                                SELECIONAR FOTO
                                <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, 'perfil')} accept="image/*" />
                            </Button>
                            {errors.perfil && (
                                <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>{errors.perfil}</Typography>
                            )}
                    </Box>
                    <Box className="card" sx={{mt:2}}>
                            <Typography className="textoCard textoRG" sx={{ml:5, mt:2}}>Selecionar Foto do RG</Typography>
                            <Box component="img" src={rgPreview || RG} alt="RG" className="imgRG" sx={{width: '200px', height: '220', mt: 4}} />
                            <Button sx={{ color: "#242424", backgroundColor: "#ccd3f8 ", ml:5, mt:-5}} component="label" role={undefined} variant="contained" tabIndex={-1} disableElevation startIcon={<CloudUploadIcon />}>
                                SELECIONAR FOTO
                                <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, 'rg')} accept="image/*" />
                            </Button>
                            {errors.rg && (
                                <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>{errors.rg}</Typography>
                            )}
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{mt:1}}>
                <Box sx={{mt: 5, display: 'flex', alignItems: 'center', width: '1200px',          
                padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box',  backgroundColor: '#CCD3F8'  }} >
                    <Typography className="texto-titulo-residencia" sx={{color: "#333", ml:10}} >
>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
                        Comprovante de Residência
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
<<<<<<< HEAD
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
=======
                    <Box className="card" sx={{mt:2, width: '500px !important'}}>
                            <Typography className="text" sx={{color: "#333", ml:10}}>Selecionar Foto do Comprovante de Residência</Typography>
                            <Box component="img" src={residenciaPreview || ComprovanteRes} alt="Residência" className="img-comprovante" sx={{ width:"200px", height:"150px", mt:3}}/>
                            <Button sx={{ color: "#242424", backgroundColor: "#ccd3f8 ", ml:5, mt:-5}} component="label" role={undefined} variant="contained" tabIndex={-1} disableElevation startIcon={<CloudUploadIcon />}>
                                SELECIONAR FOTO
                                <VisuallyHiddenInput type="file" onChange={(e) => handleFileChange(e, 'residencia')} accept="image/*" />
                            </Button>
                            {errors.residencia && (
                                <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>{errors.residencia}</Typography>
                            )}
                            <Typography className="texto-informativo" sx={{color:" #666", mt:4}}>Incluem contas de consumo (Água, Luz, Gás, Internet)</Typography>
>>>>>>> ee620314ccae4a7c4885e740a8abcc52bc3b24a6
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default CampoUsuario;