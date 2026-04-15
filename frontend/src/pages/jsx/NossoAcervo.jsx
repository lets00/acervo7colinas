import React, { useState } from "react";
import Header  from "../../components/jsx/Header.jsx";
import "../css/NossoAcervo.css";
import { Box, Typography, TextField, InputAdornment, Grid, FormControl, InputLabel, Select, MenuItem, OutlinedInput} from "@mui/material";
import SearchBranco from "../../assets/SearchBranco.png";
import Voltar from  "../../assets/Voltar.png";
import IconFilterBar from "../../assets/IconFilterBar.jpg";
import BotaoAcervo from "../../components/jsx/BotaoAcervo.jsx";

function NossoAcervo(){
    const [pesquisar, setPesquisar] = useState('');
    
    const [ordem, setOrdem] = useState(''); 

    const handleOrdemChange = (event) => {
        setOrdem(event.target.value);
    };

    return (
        <>
            <Box className="container">
                <Header/>
                <Box className="content">
                    <Typography variant="h4" align="center" className="titulo" sx={{mt: 4}} >
                        Nosso Acervo
                    </Typography>
                    <Box>
                        <Box component="img" src={Voltar} alt="Voltar" sx={{ml:-158, mt:-2, width: '30px', height: '30px' }} />
                            <Typography variant="h6" sx={{mt:-4.5, ml:-145, color: '#312783'}} >
                                Voltar
                            </Typography>
                    </Box>
                    <Box sx={{display: 'flex', mt:2}}>
                        <Box className="faixa"   sx={{mt: 3}} ></Box>
                        <Box className="faixaDois"   sx={{mt: 3}} ></Box>
                    </Box>
                    <Box className="Quadro" sx={{ml: 4, mt: -18, position: 'relative', zIndex: 1}}>
                         <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Categoria" placeholder="Ex:Ficção" size="small" sx={{width:"360px", ml:-95, mt:-2}} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Editora" placeholder="Ex:Companhia das Letras" size="small" sx={{width:"360px", ml:8, mt:-5}} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Autor" placeholder="Ex:Machado de Assis" size="small" sx={{width:"360px", ml:-95}} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Ano" placeholder="Ex:2023" size="small" sx={{width:"360px", ml:8, mt:-5}} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="ISBN" placeholder="Ex:123..." size="small" sx={{width:"360px", ml:-35}} />
                            </Grid>
                        </Grid>
                        <Box component="img"  src={IconFilterBar} alt="IconFilterBar" sx={{height:30, width:30, ml:75, mt:-20}} />
                        <Typography variant="h5" align="center" className="titulo" sx={{ml:90, mt:-4}} >
                            Filtros:
                        </Typography>
                        <Box className="filtrar">
                            
                            <FormControl size="small" sx={{ minWidth: 250, ml:107, mt:1}}>
                                <InputLabel>Ordenar por</InputLabel>
                                <Select
                                    value={ordem}
                                    onChange={handleOrdemChange}
                                    input={<OutlinedInput label="Ordenar por" />}
                                >
                                    <MenuItem value="recente">Mais Recentes</MenuItem>
                                    <MenuItem value="antigo">Mais Antigos</MenuItem>
                                    <MenuItem value="avaliados">Mais Avaliados</MenuItem>
                                    <MenuItem value="titulo_asc">Títulos (A-Z)</MenuItem>
                                    <MenuItem value="titulo_desc">Títulos (Z-A)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <BotaoAcervo/>
                    </Box>
                    <Box>
                        <TextField
                            size="small"
                            className="headerInput "
                            label="Procure seu livro"
                            value={pesquisar}
                            onChange={(e) => setPesquisar(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img
                                            src={SearchBranco}
                                            alt="Lupa"
                                            className='header-search'
                                        />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{mt:-40 }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default NossoAcervo;