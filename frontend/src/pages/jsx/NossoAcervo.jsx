
import React, { useState, useEffect } from "react";
import Header from "../../components/jsx/Header.jsx";
import "../css/NossoAcervo.css";
import {
    Box, Typography, TextField, InputAdornment,
    FormControl, InputLabel, Select, MenuItem, OutlinedInput,
} from "@mui/material";
import SearchBranco from "../../assets/SearchBranco.png";
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
        <Box className="acervo-page">
            <Header />
            <Box component="main" className="acervo-content">
                <Box className="acervo-heading">
                    <Typography component="h1" className="acervo-title">Nosso Acervo</Typography>
                </Box>

                <Box className="acervo-search-panel">
                    <TextField
                        className="acervo-search"
                        fullWidth
                        size="small"
                        placeholder="Procure seu livro"
                        value={pesquisar}
                        onChange={(e) => setPesquisar(e.target.value)}
                        inputProps={{ 'aria-label': 'Procure seu livro no acervo' }}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end"><img src={SearchBranco} alt="" width={20} /></InputAdornment>
                        ) }}
                    />
                    <Box className="acervo-filter-card">
                        <Box className="acervo-filter-fields">
                            <TextField fullWidth label="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="Ex: Ficção" size="small" />
                            <TextField fullWidth label="Editora" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder="Ex: Companhia das Letras" size="small" />
                            <TextField fullWidth label="Autor" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Ex: Machado de Assis" size="small" />
                            <TextField fullWidth label="Ano" value={ano} onChange={(e) => setAno(e.target.value)} placeholder="Ex: 2023" size="small" />
                            <TextField fullWidth label="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="Ex: 123..." size="small" />
                        </Box>
                        <Box className="acervo-sort">
                            <Typography component="h2" className="acervo-filter-title">
                                <img src={IconFilterBar} alt="" /> Filtros:
                            </Typography>
                            <FormControl fullWidth size="small">
                                <InputLabel id="acervo-ordem-label">Ordenar por</InputLabel>
                                <Select labelId="acervo-ordem-label" value={ordem} onChange={handleOrdemChange} input={<OutlinedInput label="Ordenar por" />}>
                                    <MenuItem value="recente">Mais Recentes</MenuItem>
                                    <MenuItem value="antigo">Mais Antigos</MenuItem>
                                    <MenuItem value="avaliados">Mais Avaliados</MenuItem>
                                    <MenuItem value="titulo_asc">Títulos (A-Z)</MenuItem>
                                    <MenuItem value="titulo_desc">Títulos (Z-A)</MenuItem>
                                </Select>
                            </FormControl>
                            <BotaoAcervo />
                        </Box>
                    </Box>
                </Box>

                <Box className="acervo-results-summary">
                    <Typography variant="body2">
                        Exibindo {livrosFiltrados.length > 0 ? 1 : 0}-{Math.min(5, livrosFiltrados.length)} de {livrosFiltrados.length} livro(s)
                    </Typography>
                </Box>
                <Box className="acervo-books"><BookCarrosselAcervo books={livrosExibidos} /></Box>
                <Stack className="acervo-pagination">
                    <Pagination count={10} sx={{ '& .Mui-selected': { backgroundColor: '#312783 !important', color: '#fff' } }} />
                </Stack>
            </Box>
            <Footer />
        </Box>
    );
}

export default NossoAcervo;
