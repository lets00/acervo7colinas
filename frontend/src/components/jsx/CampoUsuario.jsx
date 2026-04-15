import react from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import PerfilCadastros from "../../assets/PerfilCadastros.png";
import RG from "../../assets/RG.jpeg";
import ComprovanteRes from "../../assets/ComprovanteRes.jpeg";


function CampoUsuario() {
    return (
        <>
            <Grid container justifyContent="center" >
                <Box sx={{mt: 5, display: 'flex', alignItems: 'center', width: '1200px',          
                padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box',  backgroundColor: '#CCD3F8'  }} >
                    <Typography className="textoTituloPerfil">
                        Foto de Perfil
                    </Typography>
                    <Typography className="textoTituloRG"  sx={{ml:60, color:"#242424"}}>
                        Foto do RG
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card" sx={{mt:-2}}>
                            <Typography className="textoCard textoPerfil" >
                                Selecionar Foto
                            </Typography>
                            <Box component="img" src={PerfilCadastros} alt="Perfil" className="imgPerfil" />
                            <Button variant="contained" disableElevation className="botaoPerfil">
                                SELECIONAR FOTO
                            </Button>
                    </Box>
                    <Box className="card" sx={{mt:-2}}>
                            <Typography className="textoCard textoRG"  sx={{ml:16, mt:2}}>
                                Selecionar Foto do RG
                            </Typography>
                            <Box component="img" src={RG} alt="RG" className="imgRG" sx={{width: '180px', height: '280', mt:4}} />
                            <Button variant="contained" disableElevation  sx={{mt:7, ml:2, backgroundColor:"#ccd3f8", color: "#242424"}}>
                                SELECIONAR FOTO
                            </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{mt:1}}>
                <Box sx={{mt: 5, display: 'flex', alignItems: 'center', width: '1200px',          
                padding: '10px 40px', marginBottom: '16px', boxSizing: 'border-box',  backgroundColor: '#CCD3F8'  }} >
                    <Typography className="texto-titulo-residencia" sx={{color:"#333"}}>
                        Comprovante de Residência
                    </Typography>
                </Box>
            </Grid> 
            <Grid item xs={12} md={6}>
                <Grid container spacing={5} justifyContent="center">
                    <Box className="card" sx={{mt:-2, width: '500px !important'}}>
                            <Typography className="text">
                                Selecionar Foto do Comprovante de Residência
                            </Typography>
                            <Box component="img" src={ComprovanteRes} alt="Residência" className="img-comprovante" sx={{mt:-2, width:"200px", height:"110px"}}/>
                            <Button variant="contained" disableElevation className="botao-selecionar" sx={{ml:10,color:"#242424",backgroundColor:" #ccd3f8"}}>
                                SELECIONAR FOTO
                            </Button>
                            <Typography className="texto-informativo" sx={{color:" #666", mt:4}} >
                                Incluem contas de consumo (Água, Luz, Gás, Internet)
                            </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
};

export default CampoUsuario;