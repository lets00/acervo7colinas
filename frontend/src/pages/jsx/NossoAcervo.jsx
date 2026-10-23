
import React, { useState, useEffect } from "react";
import Header from "../../components/jsx/Header.jsx";
import "../css/NossoAcervo.css";
import {
    Box, Typography, TextField, InputAdornment, Grid,
    FormControl, InputLabel, Select, MenuItem, OutlinedInput,
} from "@mui/material";
import SearchBranco from "../../assets/SearchBranco.png";
import Voltar from "../../assets/Voltar.png";
import IconFilterBar from "../../assets/IconFilterBar.jpg";
import BookCarrosselAcervo from "../../components/jsx/BookCarrosselAcervo.jsx";
import BotaoAcervo from "../../components/jsx/BotaoAcervo.jsx";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Footer from "../../components/jsx/Footer";


function NossoAcervo() {
    const [pesquisar, setPesquisar] = useState('');
    const [ordem, setOrdem] = useState('');
    const [livros, setLivros] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [editora, setEditora] = useState('');
    const [autor, setAutor] = useState('');
    const [ano, setAno] = useState('');
    const [isbn, setIsbn] = useState('');

   
    const livrosFiltrados = livros.filter((livro) =>
        (livro.titulo ?? "")
            .toLowerCase()
            .includes(pesquisar.toLowerCase()) &&

        String(livro.categoria ?? "")
            .toLowerCase()
            .includes(categoria.toLowerCase()) &&

        String(livro.editora ?? "")
            .toLowerCase()
            .includes(editora.toLowerCase()) &&

        String(livro.autor ?? "")
            .toLowerCase()
            .includes(autor.toLowerCase()) &&

        String(livro.ano ?? "")
            .includes(ano) &&

        String(livro.isbn ?? "")
            .toLowerCase()
            .includes(isbn.toLowerCase())
    );

    const livrosExibidos = [...livrosFiltrados].sort((a, b) => {
        if (ordem === "titulo_asc") {
            return (a.titulo ?? "").localeCompare(b.titulo ?? "");
        }
        if (ordem === "titulo_desc") {
            return (b.titulo ?? "").localeCompare(a.titulo ?? "");
        }
        if (ordem === "recente") {
            return (Number(b.ano) || 0) - (Number(a.ano) || 0);
        }
        if (ordem === "antigo") {
            return (Number(a.ano) || 0) - (Number(b.ano) || 0);
        }
        if (ordem === "avaliados") {
            return (Number(b.avaliacao) || 0) -
                (Number(a.avaliacao) || 0);
        }
        return 0;
    });


    
    useEffect(() => {
        fetch("http://localhost:3000/livros")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar os livros");
                }

                return res.json();
            })
            .then((data) => {
                const listaLivros = Array.isArray(data)
                    ? data
                    : data.livros ?? [];

                setLivros(listaLivros);
            })
            .catch((error) => {
                console.error("Erro ao carregar o acervo:", error);
                setLivros([]);
            });
    }, []);


    const handleOrdemChange = (event) => {
        setOrdem(event.target.value);
    };
    return (
        <>
            <Box className="container">
                <Header />

                <Box className="content">
                    <Typography variant="h3" align="center" className="titulo" sx={{ mt: 4 }}>
                        Nosso Acervo
                    </Typography>
                    <Box>
                        <Box component="img" src={Voltar} alt="Voltar" sx={{ ml: -158, mt: -2, width: '30px', height: '30px' }} />
                        <Typography variant="h6" sx={{ mt: -4.5, ml: -145, color: '#312783',fontFamily: 'Roboto, sans-serif' }}>
                            Voltar
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 2 }}>
                        <Box className="faixa" sx={{ mt: 3 }}></Box>
                        <Box className="faixaDois" sx={{ mt: 3 }}></Box>
                    </Box>
                    <Box className="Quadro" sx={{ ml: 4, mt: -18, position: 'relative', zIndex: 1 }}>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ex:Ficção" size="small" sx={{ width: "360px", ml: -95, mt: -2 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Editora" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder="Ex:Companhia das Letras" size="small" sx={{ width: "360px", ml: 8, mt: -5 }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Ex:Machado de Assis" size="small" sx={{ width: "360px", ml: -95 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Ano" value={ano} onChange={(e) => setAno(e.target.value)} placeholder="Ex:2023" size="small" sx={{ width: "360px", ml: 8, mt: -5 }} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid item xs={6}>
                                <TextField fullWidth label="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="Ex:123..." size="small" sx={{ width: "360px", ml: -35 }} />
                            </Grid>
                        </Grid>
                        <Box component="img" src={IconFilterBar} alt="IconFilterBar" sx={{ height: 20, width: 20, ml: 78, mt: -20 }} />
                        <Typography variant="h6" align="center" className="titulo" sx={{ ml: 90, mt: -3.2, fontFamily: 'Roboto, sans-serif' }}>
                            Filtros:
                        </Typography>
                        <Box className="filtrar">
                            <FormControl size="small" sx={{ minWidth: 250, ml: 107, mt: 1 }}>
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
                        <BotaoAcervo />
                    </Box>
                    <Box className="linha">
                        < Typography variant="body2" sx={{color:"#898989", mt:10, ml:-120,fontFamily: 'Roboto, sans-serif'}}>
                            Exibindo {livrosFiltrados.length > 0 ? 1 : 0}-
                            {Math.min(5, livrosFiltrados.length)} de {livrosFiltrados.length} livro(s)
                        </ Typography>
                    </Box>
                    <Box >
                        <TextField
                            size="small"
                            placeholder="Procure seu livro"
                            value={pesquisar}
                            onChange={(e) => setPesquisar(e.target.value)}
                            inputProps={{
                                style: { color: 'white' }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <img src={SearchBranco} alt="Lupa" style={{ width: 20 }} />
                                    </InputAdornment>
                                ),
                                style: { color: 'white' }
                            }}
                            sx={{
                                width: '800px', top: '-450px',
                                '& .MuiInputBase-input': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'white' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                    '&.Mui-focused fieldset': { borderColor: 'white' }
                                }
                            }}
                        />
                    </Box>
                    <Box sx={{  px: 2, ml: -10 }}>
                        <BookCarrosselAcervo
                            books={livrosExibidos}
                        />
                    </Box>
                    <Box>
                        <Stack spacing={2} sx={{ml:52, mt:3}}>
                            <Pagination count={10} sx={{'& .Mui-selected': {backgroundColor: '#312783 !important',color: '#fff',    },
                        }} />
                        </Stack>
                    </Box>
                </Box>
                    <Box sx={{ marginTop: "40px", width: "100%" }}>
                        <Footer />
                    </Box>
            </Box>
        </>
    );
}

export default NossoAcervo;