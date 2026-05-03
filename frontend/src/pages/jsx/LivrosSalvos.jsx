import { useState, useMemo } from "react";
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

/* ─────────────────────────────────────────
   DADOS MOCKADOS
───────────────────────────────────────── */
const mockLivros = [
    { id: "001", titulo: "Dom Casmurro",                       autor: "Machado de Assis",         genero: "Romance",  ano: 1899 },
    { id: "002", titulo: "Pequeno Príncipe",                    autor: "Antoine de Saint-Exupéry", genero: "Fantasia", ano: 1943 },
    { id: "003", titulo: "Extraordinário",                      autor: "R. J. Palacio",            genero: "Romance",  ano: 2017 },
    { id: "004", titulo: "Um Sopro de Vida",                    autor: "Clarice Lispector",        genero: "Romance",  ano: 1978 },
    { id: "005", titulo: "1984",                                autor: "George Orwell",            genero: "Ficção",   ano: 1949 },
    { id: "006", titulo: "O Hobbit",                            autor: "J.R.R. Tolkien",           genero: "Fantasia", ano: 1937 },
    { id: "007", titulo: "A Hora da Estrela",                   autor: "Clarice Lispector",        genero: "Romance",  ano: 1977 },
    { id: "008", titulo: "Cem Anos de Solidão",                 autor: "García Márquez",           genero: "Romance",  ano: 1967 },
    { id: "009", titulo: "Harry Potter e a Pedra Filosofal",    autor: "J.K. Rowling",             genero: "Fantasia", ano: 1997 },
    { id: "010", titulo: "Memórias Póstumas de Brás Cubas",     autor: "Machado de Assis",         genero: "Romance",  ano: 1881 },
    { id: "011", titulo: "O Alquimista",                        autor: "Paulo Coelho",             genero: "Ficção",   ano: 1988 },
    { id: "012", titulo: "A Revolução dos Bichos",              autor: "George Orwell",            genero: "Ficção",   ano: 1945 },
];

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

   
    const filtrados = useMemo(() => {
        return mockLivros.filter((l) => {
            const matchGenero = generoFiltro === "Todos" || l.genero === generoFiltro;
            const matchBusca  =
                busca === "" ||
                l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                l.autor.toLowerCase().includes(busca.toLowerCase());
            return matchGenero && matchBusca;
        });
    }, [generoFiltro, busca]);

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
                                                <TableCell>{row.titulo}</TableCell>
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
                                                                sx={{ ...actionBtnSx, bgcolor: "#37228B", color: "#fff", "&:hover": { bgcolor: "#2a1870"} }}
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