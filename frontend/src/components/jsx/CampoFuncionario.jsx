import PerfilCadastros from '../../assets/PerfilCadastros.png'; 
import react from 'react';
import { Box, Typography, Grid, Button } from "@mui/material";
import "../css/Funcionario.css";

function CampoFuncionario() {
    return (
        <>
            <Grid container justifyContent="center" sx={{mt:3}}>
                <Box  className="foto-barra" >
                    <Typography className='foto-texto' >
                        Foto de Perfil
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="foto-box" >
                            <Typography variant="h6" sx={{mb: 2, color: "#666", fontWeight: "300", ml:20, mt:5}}>
                                Selecionar Foto
                            </Typography>
                            <Box component="img" src={PerfilCadastros} alt="Perfil" className='foto-img' />
                            <Button variant="contained" disableElevation className="botao-foto" >
                                SELECIONAR FOTO
                            </Button>
                    </Box>
                </Grid>
            </Grid>
     </>
    );
}

export default CampoFuncionario;