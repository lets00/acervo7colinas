import { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Header from "../../components/jsx/Header";
import SectionHeader from "../../components/jsx/SectionHeader";


/* ─────────────────────────────────────────
   CONSTANTES
───────────────────────────────────────── */
const STATUS_OPTIONS = ["Todos", "Ativo", "Inativo", "Suspenso"];

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
const AVATAR_COLORS = ["#F2A21E", "#00A83F", "#37228B", "#DB141F"];


/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function getStatusColor(status) {
    switch (status) {
        case "Ativo": return { bgcolor: "#c5f0c9", color: "#2e7d32" };
        case "Inativo": return { bgcolor: "#f5f5f5", color: "#616161" };
        case "Suspenso": return { bgcolor: "#fce4ec", color: "#c62828" };
        default: return { bgcolor: "#e3f2fd", color: "#1565c0" };
    }
}

function getInitials(nome = "") {
    return nome
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("");
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("pt-BR");
    } catch {
        return dateStr;
    }
}

function getAvatarColor(id) {
    return AVATAR_COLORS[id % AVATAR_COLORS.length];
}
/* ─────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────── */
export default function UsuariosSalvos() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFiltro, setStatusFiltro] = useState("Todos");
    const [busca, setBusca] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(5);

    /* ── Fetch da API ── */
    useEffect(() => {
        const controller = new AbortController();

        async function fetchUsuarios() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch("http://localhost:3000/usuarios", {
                    signal: controller.signal,
                });
                if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
                const data = await res.json();
                setUsuarios(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message || "Não foi possível carregar os usuários.");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUsuarios();
        return () => controller.abort();
    }, []);

    /* ── Filtros e paginação ── */
    const filtrados = useMemo(() => {
        return usuarios.filter((u) => {
            // O campo status pode não existir; assumimos "Ativo" como padrão
            const status = u.status || "Ativo";
            const matchStatus = statusFiltro === "Todos" || status === statusFiltro;
            const term = busca.toLowerCase();
            const matchBusca =
                busca === "" ||
                (u.nomeCompleto || "").toLowerCase().includes(term) ||
                (u.email || "").toLowerCase().includes(term) ||
                String(u.id).includes(term);
            return matchStatus && matchBusca;
        });
    }, [usuarios, statusFiltro, busca]);

    const totalPages = Math.max(1, Math.ceil(filtrados.length / rowsPerPage));
    const paginados = filtrados.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const from = filtrados.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to = Math.min(page * rowsPerPage, filtrados.length);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#fff",
                mt: "-55px",
                width: "100%",
            }}
        >
            <Header />

            <Box sx={{ width: "100%", maxWidth: "1800px" }}>
                <Box sx={{ px: { xs: 2, md: 4 }, py: 3, width: "100%" }}>

                    {/* ── Título ── */}
                    <SectionHeader title="Usuários Cadastrados!"  marginBottom="10px"/>
            

                    {/* ── Barra de filtros ── */}
                    <Box
                        sx={{
                            bgcolor: "#CCD3F8",
                            borderRadius: "0px",
                            px: 3,
                            py: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flexWrap: "wrap",
                            mb: 3,
                        }}
                    >
                        <FilterAltIcon sx={{ color: "#37228B" }} />
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#37228B" }}>
                            Filtrar:
                        </span>

                        <FormControl size="small">
                            <Select
                                value={statusFiltro}
                                onChange={(e) => {
                                    setStatusFiltro(e.target.value);
                                    setPage(1);
                                }}
                                sx={selectSx}
                                displayEmpty
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s === "Todos" ? "Usuários" : s}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ flex: 1 }} />

                        <span style={{ fontWeight: 600, fontSize: 14, color: "#37228B" }}>
                            Buscar:
                        </span>

                        <OutlinedInput
                            value={busca}
                            onChange={(e) => {
                                setBusca(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Buscar..."
                            size="small"
                            sx={{
                                borderRadius: "8px",
                                bgcolor: "#fff",
                                fontSize: 14,
                                height: 40,
                                minWidth: 220,
                            }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: "#555", fontSize: 18 }} />
                                </InputAdornment>
                            }
                        />
                    </Box>

                    {/* ── Loading ── */}
                    {loading && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                            <CircularProgress sx={{ color: "#37228B" }} />
                        </Box>
                    )}

                    {/* ── Erro ── */}
                    {!loading && error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {/* ── Tabela ── */}
                    {!loading && !error && (
                        <TableContainer
                            sx={{
                                width: "100%",
                                borderRadius: "10px",
                                overflow: "hidden",
                                border: "1px solid #e0e0e0",
                            }}
                        >
                            <Table aria-label="tabela de usuários cadastrados" sx={{ width: "100%" }}>

                                {/* Cabeçalho */}
                                <TableHead>
                                    <TableRow sx={{ bgcolor: "#37228B" }}>
                                        {["ID", "Nome", "Email", "Status", "Data de Cadastro", "Ações"].map(
                                            (col) => (
                                                <TableCell
                                                    key={col}
                                                    align={col === "Ações" ? "center" : "left"}
                                                    sx={{
                                                        color: "#fff",
                                                        fontWeight: 400,
                                                        fontSize: 14,
                                                        py: 1.5,
                                                        borderBottom: "none",
                                                        
                                                    }}
                                                >
                                                    {col}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                </TableHead>

                                {/* Corpo */}
                                <TableBody>
                                    {paginados.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                align="center"
                                                sx={{ py: 5, color: "#888" }}
                                            >
                                                Nenhum usuário encontrado.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginados.map((row, idx) => {
                                            const status = row.status || "Ativo";
                                            const statusStyle = getStatusColor(status);
                                            return (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{
                                                        bgcolor: idx % 2 === 0 ? "#fff" : "#fafafa",
                                                        "&:hover": { bgcolor: "#f6f5fb" },
                                                        transition: "background 0.15s",
                                                    }}
                                                >
                                                    {/* ID */}
                                                    <TableCell sx={{ color: "#555", fontSize: 14 }}>
                                                        <em>{String(row.id).padStart(3, "0")}</em>
                                                    </TableCell>

                                                    {/* Nome + Avatar com iniciais */}
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1.5,
                                                            }}
                                                        >
                                                            <Avatar
                                                                src={row.fotoPerfil || row.foto || row.avatar || undefined}
                                                                sx={{
                                                                    width: 34,
                                                                    height: 34,
                                                                    bgcolor: getAvatarColor(row.id),
                                                                    fontSize: 13,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {getInitials(row.nomeCompleto)}
                                                            </Avatar>
                                                            <span style={{ fontWeight: 500, fontSize: 14 }}>
                                                                {row.nomeCompleto || "—"}
                                                            </span>
                                                        </Box>
                                                    </TableCell>

                                                    {/* Email */}
                                                    <TableCell sx={{ fontSize: 14, color: "#444" }}>
                                                        {row.email || "—"}
                                                    </TableCell>

                                                    {/* Status */}
                                                    <TableCell>
                                                        <Chip
                                                            label={status}
                                                            size="small"
                                                            sx={{
                                                                ...statusStyle,
                                                                fontWeight: 600,
                                                                fontSize: 14,
                                                                borderRadius: "6px",
                                                                px: 0.5,
                                                            }}
                                                        />
                                                    </TableCell>

                                                    {/* Data de Cadastro */}
                                                    <TableCell sx={{ fontSize: 14, color: "#555" }}>
                                                        {formatDate(row.createdAt)}
                                                    </TableCell>

                                                    {/* Ações */}
                                                    <TableCell align="center">
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                gap: 1,
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            <Tooltip title="Ver perfil do usuário">
                                                                <Button
                                                                    variant="contained"
                                                                    size="small"
                                                                    startIcon={<VisibilityIcon fontSize="small" />}
                                                                    sx={{
                                                                        ...actionBtnSx,
                                                                        bgcolor: "#37228B",
                                                                        color: "#fff",
                                                                        "&:hover": { bgcolor: "#1a0c54" },
                                                                    }}
                                                                >
                                                                    Ver Perfil
                                                                </Button>
                                                            </Tooltip>
                                                            <Tooltip title="Excluir usuário">
                                                                <Button
                                                                    variant="contained"
                                                                    size="small"
                                                                    startIcon={<DeleteIcon fontSize="small" />}
                                                                    sx={{
                                                                        ...actionBtnSx,
                                                                        bgcolor: "#c62828",
                                                                        color: "#fff",
                                                                        "&:hover": { bgcolor: "#a81f1f" },
                                                                    }}
                                                                >
                                                                    Excluir
                                                                </Button>
                                                            </Tooltip>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>

                                {/* Rodapé com paginação */}
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    flexWrap: "wrap",
                                                    gap: 1,
                                                    py: 0.5,
                                                }}
                                            >
                                                <span style={{ fontSize: 13, color: "#666" }}>
                                                    {filtrados.length === 0
                                                        ? "Nenhum usuário encontrado"
                                                        : `Exibindo ${from}–${to} de ${filtrados.length} usuário(s)`}
                                                </span>
                                                <Pagination
                                                    count={totalPages}
                                                    page={page}
                                                    onChange={(_, value) => setPage(value)}
                                                    color="primary"
                                                    shape="rounded"
                                                    siblingCount={2}
                                                    boundaryCount={1}
                                                    showFirstButton
                                                    showLastButton
                                                    sx={{
                                                        "& .MuiPaginationItem-root": {
                                                            color: "#37228B",
                                                            fontWeight: 500,
                                                        },
                                                        "& .Mui-selected": {
                                                            bgcolor: "#37228B !important",
                                                            color: "#fff",
                                                        },
                                                        "& .MuiPaginationItem-root:hover": {
                                                            bgcolor: "rgba(55,34,139,0.08)",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>

                            </Table>
                        </TableContainer>
                    )}

                </Box>
            </Box>
        </Box>
    );
}