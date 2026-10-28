
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
import { useSearchParams } from "react-router-dom";

const LIVROS_POR_PAGINA = 5;

function NossoAcervo() {
    const [searchParams] = useSearchParams();
    const termoUrl = searchParams.get("q") || "";
    const [pesquisar, setPesquisar] = useState('');
    const [ordem, setOrdem] = useState('');
    const [pagina, setPagina] = useState(1);
    const [livros, setLivros] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [editora, setEditora] = useState('');
    const [autor, setAutor] = useState('');
    const [ano, setAno] = useState('');
    const [isbn, setIsbn] = useState('');

    useEffect(() => {
        setPesquisar(termoUrl);
        setPagina(1);
    }, [termoUrl]);

    const livrosFiltrados = livros.filter((livro) =>
        [
            livro.titulo,
            livro.autor,
            livro.genero,
            livro.categoria,
            livro.editora,
            livro.isbn,
        ].some((campo) =>
            String(campo ?? "")
                .toLocaleLowerCase("pt-BR")
                .includes(pesquisar.trim().toLocaleLowerCase("pt-BR"))
        ) &&

        String(livro.genero ?? livro.categoria ?? "")
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

    const totalPaginas = Math.ceil(livrosExibidos.length / LIVROS_POR_PAGINA);
    const livrosDaPagina = livrosExibidos.slice(
        (pagina - 1) * LIVROS_POR_PAGINA,
        pagina * LIVROS_POR_PAGINA
    );
    const primeiroLivro = livrosExibidos.length > 0
        ? (pagina - 1) * LIVROS_POR_PAGINA + 1
        : 0;
    const ultimoLivro = Math.min(pagina * LIVROS_POR_PAGINA, livrosExibidos.length);

    
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
        setPagina(1);
    };

    const handleFiltroChange = (setFiltro, value) => {
        setFiltro(value);
        setPagina(1);
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
                        onChange={(e) => handleFiltroChange(setPesquisar, e.target.value)}
                        inputProps={{ 'aria-label': 'Procure seu livro no acervo' }}
                        InputProps={{ endAdornment: (
                            <InputAdornment position="end"><img src={SearchBranco} alt="" width={20} /></InputAdornment>
                        ) }}
                    />
                    <Box className="acervo-filter-card">
                        <Box className="acervo-filter-fields">
                            <TextField fullWidth label="Categoria" value={categoria} onChange={(e) => handleFiltroChange(setCategoria, e.target.value)} placeholder="Ex: Ficção" size="small" />
                            <TextField fullWidth label="Editora" value={editora} onChange={(e) => handleFiltroChange(setEditora, e.target.value)} placeholder="Ex: Companhia das Letras" size="small" />
                            <TextField fullWidth label="Autor" value={autor} onChange={(e) => handleFiltroChange(setAutor, e.target.value)} placeholder="Ex: Machado de Assis" size="small" />
                            <TextField fullWidth label="Ano" value={ano} onChange={(e) => handleFiltroChange(setAno, e.target.value)} placeholder="Ex: 2023" size="small" />
                            <TextField fullWidth label="ISBN" value={isbn} onChange={(e) => handleFiltroChange(setIsbn, e.target.value)} placeholder="Ex: 123..." size="small" />
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
                        Exibindo {primeiroLivro}-{ultimoLivro} de {livrosExibidos.length} livro(s)
                    </Typography>
                </Box>
                <Box className="acervo-books">
                    <BookCarrosselAcervo key={pagina} books={livrosDaPagina} />
                </Box>
                {totalPaginas > 0 && (
                    <Stack className="acervo-pagination">
                        <Pagination
                            count={totalPaginas}
                            page={pagina}
                            onChange={(_, novaPagina) => setPagina(novaPagina)}
                            sx={{ '& .Mui-selected': { backgroundColor: '#312783 !important', color: '#fff' } }}
                        />
                    </Stack>
                )}
            </Box>
            <Footer />
        </Box>
    );
}

export default NossoAcervo;
