import { useState, useMemo, useEffect }from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Header from "../../components/jsx/Header";
import "../css/LivrosSalvos.css";
import AssignmentIcon from '@mui/icons-material/Assignment';
import api from "../../services/apis";

const PERFIL_OPTIONS = ["Todos","A a Z", "Z a A"];

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

export default function EntregadoresSalvos() {
    const [entregadores, setEntregadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [perfilFiltro, setPerfilFiltro] = useState("Todos");
    const [busca, setBusca] = useState("");
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const fetchEntregadores = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get("/funcionarios");
            const entregadoresFiltrados = (Array.isArray(data) ? data : data.content ?? [])
                .filter(func => func.cargo?.toLowerCase() === 'entregador' || func.tipoAcesso?.toLowerCase() === 'entregador');
            setEntregadores(entregadoresFiltrados);
        } catch (err) {
            const mensagem = err.response?.data?.message || err.message || "Erro ao carregar entregadores.";
            setError(mensagem);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntregadores();
    }, []);

    const handleDeletarEntregador = async (id) => {
        if (!window.confirm("Deseja realmente excluir este entregador?")) return;
        try {
            await api.delete(`/funcionarios/${id}`);
            setEntregadores((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            const mensagem = err.response?.data?.message || err.message || "Erro ao excluir entregador.";
            alert("Erro ao excluir: " + mensagem);
        }
    };

    const entregadoresFiltrados = useMemo(() => {
        let resultado = [...entregadores];

        if (busca) {
            const termo = busca.toLowerCase();
            resultado = resultado.filter(ent => 
                ent.nomeCompleto?.toLowerCase().includes(termo) || 
                ent.email?.toLowerCase().includes(termo)
            );
        }

        if (perfilFiltro === "A a Z") {
            resultado.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
        } else if (perfilFiltro === "Z a A") {
            resultado.sort((a, b) => b.nomeCompleto.localeCompare(a.nomeCompleto));
        }

        return resultado;
    }, [entregadores, perfilFiltro, busca]);


    const totalPages = Math.max(1, Math.ceil(entregadoresFiltrados.length / rowsPerPage));
    const entregadoresPagina = entregadoresFiltrados.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const from = entregadoresFiltrados.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to = Math.min(page * rowsPerPage, entregadoresFiltrados.length);

    return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px", width: "100%" }}>
      <Header />

      <Box sx={{ width: "100%", maxWidth: "1800px" }}>
        <Box className="livrossalvos-page" sx={{ width: "100%" }}>

          <div className="livrossalvos-topbar">
            <h1 className="livrossalvos-titulo">Entregadores Cadastrados</h1>
          </div>

          <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3, width: "1200px" }} />

          <div className="livrossalvos-filters">
            <span className="filter-inline-label">Filtrar:</span>

            <FormControl size="small">
              <Select
                value={perfilFiltro}
                onChange={(e) => { setPerfilFiltro(e.target.value); setPage(1); }}
                sx={selectSx}
                displayEmpty
              >
                {PERFIL_OPTIONS.map((perfil) => (
                  <MenuItem key={perfil} value={perfil}>
                    {perfil}
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
                placeholder="Procure por nome ou email do Entregadores"
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

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress sx={{ color: "#37228B" }} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <div className="livrossalvos-table-wrapper">
              <TableContainer sx={{ width: "100%" }}>
                <Table aria-label="tabela de entregadores cadastrados" sx={{ width: "100%" }}>

                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Setor</TableCell>
                      <TableCell>Disponibilidade</TableCell>
                      <TableCell>Telefone</TableCell>
                      <TableCell>Tipo de Acesso</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {entregadoresPagina.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#888" }}>
                          Nenhum entregador encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      entregadoresPagina.map((entregador) => (
                        <TableRow key={entregador.id}>
                          <TableCell><em>{entregador.id}</em></TableCell>

                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                src={entregador.fotoPerfil ?? entregador.capa}
                                alt={entregador.nomeCompleto}
                                variant="rounded"
                                sx={{ width: 36, height: 36, flexShrink: 0 }}
                              >
                                <AssignmentIcon fontSize="small" />
                              </Avatar>
                              {entregador.nomeCompleto}
                            </Box>
                          </TableCell>

                          <TableCell>{entregador.setor ?? "-"}</TableCell>
                          <TableCell>{entregador.disponibilidade ?? "-"}</TableCell>
                          <TableCell>{entregador.telefone ?? "-"}</TableCell>
                          <TableCell>{entregador.tipoAcesso ?? "-"}</TableCell>

                          <TableCell align="center">
                            <div className="acoes-cell">
                              <Tooltip title="Ver perfil do entregador">
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  sx={{ ...actionBtnSx, bgcolor: "#37228B", color: "#fff", "&:hover": { bgcolor: "#2a1870" } }}
                                >
                                  Ver Perfil
                                </Button>
                              </Tooltip>

                              <Tooltip title="Excluir Entregador">
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleDeletarEntregador(entregador.id)}
                                  sx={{ ...actionBtnSx, bgcolor: "#c62828", color: "#fff", "&:hover": { bgcolor: "#a81f1f" } }}
                                >
                                  Excluir
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
                      <TableCell colSpan={7}>
                        <div className="livrossalvos-footer">
                          <span className="livrossalvos-exibindo">
                            {entregadoresFiltrados.length === 0
                              ? "Nenhum entregador encontrado"
                              : `Exibindo ${from}–${to} de ${entregadoresFiltrados.length} entregador(es)`}
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
          )}

        </Box>
      </Box>
    </Box>
  );
}
