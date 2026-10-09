import { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";

// MUI — layout
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// MUI — inputs & controles
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

// MUI — tabela COMPLETA (incluindo TableFooter e TablePagination)
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// MUI — ícones
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Footer from "../../components/jsx/Footer";
import Header from "../../components/jsx/Header";
import Girlreading from "../../assets/Girl-enjoying-reading.png"; // ajuste o caminho
import { getUsuario } from "../../utils/auth";
import "../css/MeusEmprestimos.css";


/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function dataDeHoje() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
}

function somarDias(data, dias) {
    const base = new Date(`${data}T00:00:00`);
    base.setDate(base.getDate() + dias);
    return `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`;
}

function formatarData(data) {
    if (!data) return "—";
    const [ano, mes, dia] = String(data).split("T")[0].split("-");
    return `${dia}/${mes}/${ano}`;
}

function derivarStatus({ is_devolvido, data_entrega }) {
    if (is_devolvido) return "Devolvido";
    if (!data_entrega) return "Solicitado";
    return data_entrega < dataDeHoje() ? "Atrasado" : "Ativo";
}

function paraLinha(emprestimo) {
    return {
        id: emprestimo.id,
        codigo: `EMP-${String(emprestimo.id).slice(0, 8).toUpperCase()}`,
        livro: emprestimo.Livro?.titulo ?? "Livro removido",
        autor: emprestimo.Livro?.autor ?? "",
        dataPedido: formatarData(emprestimo.data_emprestimo),
        devolucaoPrevista: formatarData(emprestimo.data_entrega),
        dataEntrega: emprestimo.data_entrega,
        status: derivarStatus(emprestimo),
    };
}

const STATUS_OPTIONS = ["Todos", "Solicitado", "Ativo", "Atrasado", "Cancelado", "Devolvido"];


/* ─────────────────────────────────────────
   HELPERS DE UI
───────────────────────────────────────── */
function StatusBadge({ status }) {
    const cls = {
        Solicitado: "status-solicitado",
        Ativo:      "status-ativo",
        Atrasado:   "status-atrasado",
        Cancelado:  "status-cancelado",
        Devolvido:  "status-devolvido",
    }[status] ?? "status-devolvido";

    return (
        <span className={`status-badge ${cls}`}>
            <span className="dot" />
            {status}
        </span>
    );
}

function StatCard({ label, count, icon }) {
    return (
        <div className="stat-emprestimo-card">
            <span className="stat-emprestimo-label">{label}</span>
            <div className="stat-emprestimo-bottom">
                <span className="stat-emprestimo-count">{count}</span>
                {icon}
            </div>
        </div>
    );
}

const selectSx = {
    height: 40,
    fontSize: 14,
    borderRadius: "8px",
    bgcolor: "#fff",
    minWidth: 130,
};

const actionBtnSx = {
    borderColor: "#37228B",
    color: "#37228B",
    borderRadius: "6px",
    textTransform: "none",
    fontSize: 12,
    px: 1.5,
    "&:hover": { borderColor: "#2a1870", bgcolor: "rgba(55,34,139,0.05)" },
};

/* ─────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────── */
export default function MeusEmprestimos() {
    const [statusFiltro, setStatusFiltro] = useState("Todos");
    const [tipoFiltro, setTipoFiltro]     = useState("Todos");
    const [busca, setBusca]               = useState("");

    const [emprestimos, setEmprestimos]   = useState([]);
    const [carregando, setCarregando]     = useState(true);
    const [erro, setErro]                 = useState("");
    const [acaoPendente, setAcaoPendente] = useState(null);

    // TablePagination usa page baseado em 0
    const [page, setPage]               = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const carregarEmprestimos = useCallback(async () => {
        const userId = localStorage.getItem("user_id") || getUsuario()?.id;

        if (!userId) {
            setErro("Faça login para ver seus empréstimos.");
            setCarregando(false);
            return;
        }

        try {
            setErro("");
            const { data } = await axios.get("http://localhost:3000/emprestimos", {
                params: { user_id: userId },
            });
            setEmprestimos(data.map(paraLinha));
        } catch (error) {
            setErro(error.response?.data?.mensagem ?? "Não foi possível carregar seus empréstimos.");
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarEmprestimos();
    }, [carregarEmprestimos]);

    /* contagens para os cards */
    const counts = useMemo(() => ({
        Ativos:      emprestimos.filter(e => e.status === "Ativo").length,
        Solicitados: emprestimos.filter(e => e.status === "Solicitado").length,
        Atrasados:   emprestimos.filter(e => e.status === "Atrasado").length,
        Devolvidos:  emprestimos.filter(e => e.status === "Devolvido").length,
        Cancelados:  emprestimos.filter(e => e.status === "Cancelado").length,
    }), [emprestimos]);

    /* filtragem */
    const filtrados = useMemo(() => {
        return emprestimos.filter(e => {
            const matchStatus = statusFiltro === "Todos" || e.status === statusFiltro;
            const matchBusca  = e.livro.toLowerCase().includes(busca.toLowerCase());
            return matchStatus && matchBusca;
        });
    }, [emprestimos, statusFiltro, busca]);

    /* linhas da página atual */
    const paginados = filtrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (_, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handleFiltrar = () => setPage(0);

    const handleCancelar = async (id) => {
        if (!window.confirm("Tem certeza que deseja cancelar esta solicitação?")) return;

        try {
            setAcaoPendente(id);
            await axios.delete(`http://localhost:3000/emprestimos/${id}`);
            await carregarEmprestimos();
        } catch (error) {
            alert(error.response?.data?.mensagem ?? "Não foi possível cancelar a solicitação.");
        } finally {
            setAcaoPendente(null);
        }
    };

    const handleRenovar = async (emprestimo) => {
        try {
            setAcaoPendente(emprestimo.id);
            await axios.patch(`http://localhost:3000/emprestimos/${emprestimo.id}`, {
                data_entrega: somarDias(emprestimo.dataEntrega ?? dataDeHoje(), 14),
            });
            await carregarEmprestimos();
        } catch (error) {
            alert(error.response?.data?.mensagem ?? "Não foi possível renovar o empréstimo.");
        } finally {
            setAcaoPendente(null);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px" }}>
            <Header />

            <Box sx={{ width: "100%", maxWidth: "1440px", px: { xs: "16px", sm: "28px", md: "60px" }, pb: "48px" }}>
                <div className="emprestimos-page">

                    {/* ── Topo ── */}
                    <div className="emprestimos-topbar">
                        <h1 className="emprestimos-titulo">Meus Empréstimos</h1>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{ bgcolor: "#37228B", borderRadius: "8px", fontWeight: 600, fontSize: 14, px: 3, py: 1, textTransform: "none", "&:hover": { bgcolor: "#2a1870" } }}
                        >
                            Novo Pedido
                        </Button>
                    </div>

                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3 }} />

                    {/* ── Cards de estatísticas ── */}

                    <div className="emprestimos-stats-wrapper">
                        <div className="emprestimos-stats">
                            <StatCard label="Ativos" count={counts.Ativos} icon={<MenuBookIcon sx={{ color: "#37228B", fontSize: 28 }} />} />
                            <StatCard label="Solicitados" count={counts.Solicitados} icon={<PendingActionsIcon sx={{ color: "#37228B", fontSize: 28 }} />} />
                            <StatCard label="Atrasados" count={counts.Atrasados} icon={<WarningAmberIcon sx={{ color: "#c62828", fontSize: 28 }} />} />
                            <StatCard label="Devolvidos" count={counts.Devolvidos} icon={<CheckCircleIcon sx={{ color: "#37228B", fontSize: 28 }} />} />
                            <StatCard label="Cancelados" count={counts.Cancelados} icon={<CancelIcon sx={{ color: "#555", fontSize: 28 }} />} />
                        </div>

                        {/* IMAGEM */}
                        <img src={Girlreading} alt="Ilustração leitura" className="emprestimos-img" />
                    </div>

                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3 }} />

                    {/* ── Barra de filtros ── */}
                    <div className="emprestimos-filters">
                        <FormControl size="small">
                            <Select value={statusFiltro} onChange={e => { setStatusFiltro(e.target.value); setPage(0); }} sx={selectSx}>
                                {STATUS_OPTIONS.map(s => (
                                    <MenuItem key={s} value={s}>{s === "Todos" ? "Status" : s}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl size="small">
                            <Select value={tipoFiltro} onChange={e => { setTipoFiltro(e.target.value); setPage(0); }} sx={selectSx}>
                                <MenuItem value="Todos">Todos</MenuItem>
                                <MenuItem value="Físico">Físico</MenuItem>
                                <MenuItem value="Digital">Digital</MenuItem>
                            </Select>
                        </FormControl>

                        <div className="filter-search-wrapper">
                            <OutlinedInput
                                value={busca}
                                onChange={e => { setBusca(e.target.value); setPage(0); }}
                                placeholder="Buscar por livro..."
                                size="small"
                                fullWidth
                                endAdornment={<InputAdornment position="end"><SearchIcon sx={{ color: "#555" }} /></InputAdornment>}
                                sx={{ borderRadius: "8px", bgcolor: "#fff", fontSize: 14, height: 40 }}
                            />
                        </div>

                        <Button
                            variant="contained"
                            startIcon={<FilterAltIcon />}
                            onClick={handleFiltrar}
                            sx={{ bgcolor: "#37228B", borderRadius: "8px", fontWeight: 600, fontSize: 14, px: 3, height: 40, textTransform: "none", flexShrink: 0, "&:hover": { bgcolor: "#2a1870" } }}
                        >
                            Filtrar
                        </Button>
                    </div>

                    {/* ── Tabela ── */}
                    <div className="emprestimos-table-wrapper">
                        <TableContainer>
                            <Table aria-label="tabela de empréstimos">

                                {/* CABEÇALHO */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Código</TableCell>
                                        <TableCell>Livro</TableCell>
                                        <TableCell>Data do Pedido</TableCell>
                                        <TableCell>Devolução Prevista</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>

                                {/* CORPO */}
                                <TableBody>
                                    {carregando ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#888" }}>
                                                Carregando empréstimos...
                                            </TableCell>
                                        </TableRow>
                                    ) : erro ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#c62828" }}>
                                                {erro}
                                            </TableCell>
                                        </TableRow>
                                    ) : paginados.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#888" }}>
                                                Nenhum empréstimo encontrado.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        paginados.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell><em>{row.codigo}</em></TableCell>

                                                <TableCell>
                                                    <div className="livro-cell">
                                                        <div className="livro-cell-thumb-placeholder" />
                                                        <div className="livro-cell-info">
                                                            <span className="livro-cell-nome">{row.livro}</span>
                                                            <span className="livro-cell-autor">{row.autor}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell><em>{row.dataPedido}</em></TableCell>
                                                <TableCell><em>{row.devolucaoPrevista}</em></TableCell>

                                                <TableCell>
                                                    <StatusBadge status={row.status} />
                                                </TableCell>

                                                <TableCell>
                                                    <div className="acoes-cell">
                                                        {row.status === "Solicitado" && (
                                                            <Tooltip title="Cancelar pedido">
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    startIcon={<CloseIcon />}
                                                                    disabled={acaoPendente === row.id}
                                                                    onClick={() => handleCancelar(row.id)}
                                                                    sx={actionBtnSx}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        {row.status === "Atrasado" && (
                                                            <Tooltip title="Renovar empréstimo">
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    startIcon={<AutorenewIcon />}
                                                                    disabled={acaoPendente === row.id}
                                                                    onClick={() => handleRenovar(row)}
                                                                    sx={actionBtnSx}
                                                                >
                                                                    Renovar
                                                                </Button>
                                                            </Tooltip>
                                                        )}
                                                        <Tooltip title="Ver detalhes">
                                                            <Button variant="outlined" size="small" startIcon={<ZoomInIcon />} disabled sx={actionBtnSx}>
                                                                Detalhes
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>

                                {/* RODAPÉ — TableFooter com TablePagination dentro */}
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            colSpan={6}
                                            count={filtrados.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            labelRowsPerPage="Linhas por página:"
                                            labelDisplayedRows={({ from, to, count }) =>
                                                `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
                                            }
                                        />
                                    </TableRow>
                                </TableFooter>

                            </Table>
                        </TableContainer>
                    </div>

                </div>
                <div className="container-footer"><Footer /> </div>

                

            </Box>
        </Box>
    );
}