import { useState, useMemo, useEffect } from "react";
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
import "../css/LivrosSalvos.css"; // Mantendo a folha de estilos padrão do primeiro código

/* ─────────────────────────────────────────
    CONSTANTES E ESTILOS COMPARTILHADOS
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

    /* ── Buscar Usuários ── */
    const fetchUsuarios = async (signal) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("http://localhost:3000/usuarios", { signal });
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
    };

    /* ── Deletar Usuário ── */
    const handleDeletarUsuario = async (id) => {
        if (!window.confirm("Deseja excluir este usuário?")) return;
        try {
            const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Erro ao excluir do servidor.");
            
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            alert("Erro ao excluir: " + err.message);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        fetchUsuarios(controller.signal);
        return () => controller.abort();
    }, []);

    /* ── Filtros e Paginação ── */
    const filtrados = useMemo(() => {
        return usuarios.filter((u) => {
            const status = u.status || "Ativo";
            const matchStatus = statusFiltro === "Todos" || status.toLowerCase() === statusFiltro.toLowerCase();
            
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px", width: "100%" }}>
            <Header />

            <Box sx={{ width: "100%", maxWidth: "1800px" }}>
                <Box className="livrossalvos-page" sx={{ width: "100%" }}>

                    {/* ── Topbar (Título) ── */}
                    <div className="livrossalvos-topbar">
                        <h1 className="livrossalvos-titulo">Usuários Cadastrados</h1>
                    </div>

                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3, width: "1200px" }} />

                    {/* ── Barra de Filtros Alinhada ── */}
                    <div className="livrossalvos-filters">
                        <span className="filter-inline-label">Filtrar:</span>

                        <FormControl size="small">
                            <Select
                                value={statusFiltro}
                                onChange={(e) => { setStatusFiltro(e.target.value); setPage(1); }}
                                sx={selectSx}
                                displayEmpty
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <MenuItem key={s} value={s}>
                                        {s}
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
                                placeholder="Procure por nome ou email do usuário"
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

                    {/* ── Status de Carregamento ── */}
                    {loading && (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                            <CircularProgress sx={{ color: "#37228B" }} />
                        </Box>
                    )}

                    {/* ── Alerta de Erro ── */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    )}

                    {/* ── Tabela de Dados Reestilizada ── */}
                    {!loading && !error && (
                        <div className="livrossalvos-table-wrapper">
                            <TableContainer sx={{ width: "100%" }}>
                                <Table aria-label="tabela de usuários cadastrados" sx={{ width: "100%" }}>
                                    
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Nome</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Data de Cadastro</TableCell>
                                            <TableCell align="center">Ações</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {paginados.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#888" }}>
                                                    Nenhum usuário encontrado.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginados.map((row) => {
                                                const status = row.status || "Ativo";
                                                const statusStyle = getStatusColor(status);
                                                return (
                                                    <TableRow key={row.id}>
                                                        {/* ID */}
                                                        <TableCell>
                                                            <em>{String(row.id).padStart(3, "0")}</em>
                                                        </TableCell>

                                                        {/* Nome + Avatar */}
                                                        <TableCell>
                                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                                                <Avatar
                                                                    src={row.fotoPerfil || row.foto || row.avatar || undefined}
                                                                    sx={{ width: 36, height: 36, flexShrink: 0, bgcolor: getAvatarColor(row.id), fontSize: 13, fontWeight: 700 }}
                                                                >
                                                                    {getInitials(row.nomeCompleto)}
                                                                </Avatar>
                                                                {row.nomeCompleto || "—"}
                                                            </Box>
                                                        </TableCell>

                                                        {/* Email */}
                                                        <TableCell>{row.email || "—"}</TableCell>

                                                        {/* Status */}
                                                        <TableCell>
                                                            <Chip
                                                                label={status}
                                                                size="small"
                                                                sx={{ ...statusStyle, fontWeight: 600, fontSize: 12, borderRadius: "6px", px: 0.5 }}
                                                            />
                                                        </TableCell>

                                                        {/* Data de Cadastro */}
                                                        <TableCell>
                                                            <em>{row.createdAt ? new Date(row.createdAt).toLocaleDateString('pt-BR') : '-'}</em>
                                                        </TableCell>

                                                        {/* Ações */}
                                                        <TableCell align="center">
                                                            <div className="acoes-cell">
                                                                <Tooltip title="Ver perfil do usuário">
                                                                    <Button
                                                                        variant="contained"
                                                                        size="small"
                                                                        startIcon={<VisibilityIcon />}
                                                                        sx={{ ...actionBtnSx, bgcolor: "#37228B", color: "#fff", "&:hover": { bgcolor: "#2a1870" } }}
                                                                    >
                                                                        Ver Perfil
                                                                    </Button>
                                                                </Tooltip>

                                                                <Tooltip title="Excluir usuário">
                                                                    <Button
                                                                        variant="contained"
                                                                        size="small"
                                                                        startIcon={<DeleteIcon />}
                                                                        onClick={() => handleDeletarUsuario(row.id)}
                                                                        sx={{ ...actionBtnSx, bgcolor: "#c62828", color: "#fff", "&:hover": { bgcolor: "#a81f1f" } }}
                                                                    >
                                                                        Excluir
                                                                    </Button>
                                                                </Tooltip>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>

                                    {/* Rodapé e Paginação */}
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <div className="livrossalvos-footer">
                                                    <span className="livrossalvos-exibindo">
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
                                                        siblingCount={1}
                                                        boundaryCount={1}
                                                        sx={{
                                                            "& .MuiPaginationItem-root": { color: "#37228B", fontWeight: 500 },
                                                            "& .Mui-selected": { bgcolor: "#37228B !important", color: "#fff" },
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
                    )}

                </Box>
            </Box>
        </Box>
    );
}