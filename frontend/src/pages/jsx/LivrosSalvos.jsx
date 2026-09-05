import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../../components/jsx/Header";
import "../css/LivrosSalvos.css";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, green } from '@mui/material/colors';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {useNavigate} from "react-router-dom";


const GENERO_OPTIONS = [
    "Todos", "Ficção", "Ficção Científica", "Fantasia", "Aventura",
    "Drama", "Distopia", "Infantojuvenil", "HQs e Mangás", "Romance",
    "Terror", "Contos", "Crônicas", "Poesia", "Suspense", "Biografia",
    "Autoajuda", "História", "Filosofia", "Religião e Espiritualidade",
    "Negócios e Carreira", "Culinária", "Saúde e Bem-estar", "Tecnologia e Ciência",
];

const selectSx = {
    height: 40,
    fontSize: 14,
    borderRadius: "8px",
    bgcolor: "#fff",
    minWidth: 160,
};

const actionBtnSx = {
    borderRadius: "6px",
    textTransform: "none",
    fontSize: 12,
    px: 1.5,
    boxShadow: "none",
};

export default function LivrosSalvos() {
    const [generoFiltro, setGeneroFiltro] = useState("Todos");
    const [busca, setBusca]               = useState("");
    const [page, setPage]                 = useState(1);
    const [rowsPerPage]                   = useState(5);
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/livros");
            setLivros(response.data);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
            alert("Erro ao carregar os livros da base de dados.");
        } finally {
            setLoading(false);
        }
    };
    const handleExcluirLivro = async (id) => {
        if (window.confirm(`Tem certeza que deseja excluir o livro com ID ${id}?`)) {
            try {
                await axios.delete(`http://localhost:3000/livros/${id}`);
                alert("Livro excluído com sucesso!");
                carregarLivros(); 
            } catch (error) {
                console.error("Erro ao excluir livro:", error);
                alert("Não foi possível excluir o livro.");
            }
        }
    };

    const filtrados = useMemo(() => {
        return livros.filter((livro) => {
            const matchesGenero = generoFiltro === "Todos" || livro.genero === generoFiltro;
            
            const matchesBusca = 
                livro.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
                livro.autor?.toLowerCase().includes(busca.toLowerCase());

            return matchesGenero && matchesBusca;
        });
    }, [livros, generoFiltro, busca]);

    const totalPages = Math.max(1, Math.ceil(filtrados.length / rowsPerPage));
    const paginados  = filtrados.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const from       = filtrados.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to         = Math.min(page * rowsPerPage, filtrados.length);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px", width: "100%" }}>
            <Header />

            <Box sx={{ width: "100%", maxWidth:"1800px"}}>
                <Box className="livrossalvos-page" sx={{ width: "100%" }}>

                    
                    <div className="livrossalvos-topbar"  sx={{ width: "100%"}}>
                        <h1 className="livrossalvos-titulo">Livros Cadastrados</h1>
                        <Button
                            variant="contained"
                            sx={{ width: "100%"}}
                            startIcon={<AddIcon />}
                            onClick={() => navigate("/livros")}
                            sx={{ bgcolor: "#37228B", borderRadius: "8px", fontWeight: 600, fontSize: 14, px: 3, py: 1, textTransform: "none", "&:hover": { bgcolor: "#2a1870" } }}
                        >
                            Adicionar novo livro
                        </Button>
                    </div>

                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3, width:'1200px'}} />

                    
                    <div className="livrossalvos-filters" >
                        <span className="filter-inline-label">Filtrar:</span>

                        <FormControl size="small">
                            <Select
                                value={generoFiltro}
                                onChange={(e) => { setGeneroFiltro(e.target.value); setPage(1); }}
                                sx={selectSx}
                                displayEmpty
                            >
                                {GENERO_OPTIONS.map((g) => (
                                    <MenuItem key={g} value={g}>
                                        {g === "Todos" ? "Gênero *" : g}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <div style={{ flex: 1 }} />

                        <span className="filter-inline-label">Buscar:</span>

                        <div className="filter-search-wrapper">
                            <OutlinedInput
                                value={busca}
                                onChange={(e) => { setBusca(e.target.value); setPage(1); }}
                                placeholder="Procure seu livro"
                                size="small"
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: "#555" }} />
                                    </InputAdornment>
                                }
                                sx={{ borderRadius: "8px", bgcolor: "#fff", fontSize: 14, height: 40 }}
                            />
                        </div>

                        <Button
                            variant="contained"
                            startIcon={<FilterAltIcon />}
                            onClick={() => setPage(1)}
                            sx={{ bgcolor: "#37228B", borderRadius: "8px", fontWeight: 600, fontSize: 14, px: 3, height: 40, textTransform: "none", flexShrink: 0, "&:hover": { bgcolor: "#2a1870" } }}
                        >
                            Filtrar
                        </Button>
                    </div>

                    <div className="livrossalvos-table-wrapper">
                        <TableContainer  sx={{ width: "100%" }}>
                            <Table aria-label="tabela de livros cadastrados"  sx={{ width: "100%" }}>

                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Título</TableCell>
                                        <TableCell>Autor</TableCell>
                                        <TableCell>Gênero</TableCell>
                                        <TableCell>Ano</TableCell>
                                        <TableCell align="center">Ações</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginados.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#888" }}>
                                                Nenhum livro encontrado.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginados.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell><em>{row.id}</em></TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                                        <Avatar
                                                            src={row.img ? `http://localhost:3000${row.img}` : undefined}
                                                            alt={row.titulo}
                                                            variant="rounded"
                                                            sx={{ width: 36, height: 52, flexShrink: 0 }}
                                                            >
                                                            <AssignmentIcon fontSize="small" />
                                                        </Avatar>
                                                        {row.titulo}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{row.autor}</TableCell>
                                                <TableCell>{row.genero}</TableCell>
                                                <TableCell><em>{row.ano}</em></TableCell>
                                                <TableCell align="center">
                                                    <div className="acoes-cell">
                                                        <Tooltip title="Editar livro">
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                startIcon={<EditIcon />}
                                                                onClick={() => navigate(`/livros/editar/${row.id}`)}
                                                                sx={{
                                                                    ...actionBtnSx,
                                                                    bgcolor: "#37228B",
                                                                    color: "#fff",
                                                                    "&:hover": { bgcolor: "#2a1870" }
                                                                }}
                                                            >
                                                                EDITAR
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Excluir livro">
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                startIcon={<DeleteIcon />}
                                                                sx={{ ...actionBtnSx, bgcolor: "#c62828", color: "#fff", "&:hover": { bgcolor: "#a81f1f" } }}
                                                            >
                                                                EXCLUIR
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>

                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <div className="livrossalvos-footer">
                                                <span className="livrossalvos-exibindo">
                                                    {filtrados.length === 0
                                                        ? "Nenhum livro encontrado"
                                                        : `Exibindo ${from}–${to} de ${filtrados.length} livro(s)`}
                                                </span>
                                                <Pagination
                                                    count={totalPages}
                                                    page={page}
                                                    onChange={(_, value) => setPage(value)}
                                                    color="primary"
                                                    shape="rounded"
                                                    siblingCount={1}
                                                    boundaryCount={1}
                                                    sx={{
                                                        "& .MuiPaginationItem-root":       { color: "#37228B", fontWeight: 500 },
                                                        "& .Mui-selected":                 { bgcolor: "#37228B !important", color: "#fff" },
                                                        "& .MuiPaginationItem-root:hover": { bgcolor: "rgba(55,34,139,0.08)" },
                                                    }}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>

                            </Table>
                        </TableContainer>
                    </div>

                </Box>
            </Box>
        </Box>
    );
}

