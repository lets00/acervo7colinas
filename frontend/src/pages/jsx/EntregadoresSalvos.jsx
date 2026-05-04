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

const PERFIL_OPTIONS = ["Todos", "Administrador", "Funcionário", "Estagiário", "A a Z", "Z a A"];

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

export default function FuncionariosSalvos() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading]           = useState(true);
    const [error, setError]               = useState(null);

    const [perfilFiltro, setPerfilFiltro] = useState("Todos");
    const [busca, setBusca]               = useState("");
    const [page, setPage]                 = useState(1);
    const [rowsPerPage]                   = useState(5);

    const fetchFuncionarios = async () => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await api.get("/funcionarios");
            setFuncionarios(Array.isArray(data) ? data : data.content ?? []);
        } catch (err) {
            setError(err.message || "Erro ao carregar funcionários.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeletarFuncionario = async (id) => {
        if (!window.confirm("Deseja excluir este funcionário?")) return;
        try {
            await api.delete(`/funcionarios/${id}`);
            setFuncionarios((prev) => prev.filter((f) => f.id !== id));
        } catch (err) {
            alert("Erro ao excluir: " + err.message);
        }
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);


    const funcionariosFiltrados = useMemo(() => {
        return funcionarios.filter((funcionario) => {
        const matchPerfil =
            perfilFiltro === "Todos" ||
            funcionario.perfil?.toLowerCase() === perfilFiltro.toLowerCase();

        const matchBusca =
            busca === "" ||
            funcionario.nome?.toLowerCase().includes(busca.toLowerCase()) ||
            funcionario.email?.toLowerCase().includes(busca.toLowerCase());

        return matchPerfil && matchBusca;
        });
    }, [funcionarios, perfilFiltro, busca]);

    const totalPages         = Math.max(1, Math.ceil(funcionariosFiltrados.length / rowsPerPage));
    const funcionariosPagina = funcionariosFiltrados.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const from               = funcionariosFiltrados.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
    const to                 = Math.min(page * rowsPerPage, funcionariosFiltrados.length);

    return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px", width: "100%" }}>
      <Header />

      <Box sx={{ width: "100%", maxWidth: "1800px" }}>
        <Box className="livrossalvos-page" sx={{ width: "100%" }}>

          <div className="livrossalvos-topbar">
            <h1 className="livrossalvos-titulo">Funcionários Cadastrados</h1>
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
                placeholder="Procure por nome ou email do funcionário"
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
                <Table aria-label="tabela de funcionários cadastrados" sx={{ width: "100%" }}>

                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Funcionário</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Perfil / Cargo</TableCell>
                      <TableCell>Data de Cadastro</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {funcionariosPagina.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: "#888" }}>
                          Nenhum funcionário encontrado.
                        </TableCell>
                      </TableRow>
                    ) : (
                      funcionariosPagina.map((funcionario) => (
                        <TableRow key={funcionario.id}>
                          <TableCell><em>{funcionario.id}</em></TableCell>

                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                              <Avatar
                                src={funcionario.fotoPerfil ?? funcionario.capa}
                                alt={funcionario.nome}
                                variant="rounded"
                                sx={{ width: 36, height: 36, flexShrink: 0 }}
                              >
                                <AssignmentIcon fontSize="small" />
                              </Avatar>
                              {funcionario.nome}
                            </Box>
                          </TableCell>

                          <TableCell>{funcionario.email}</TableCell>
                          <TableCell>{funcionario.perfil ?? funcionario.cargo}</TableCell>
                          <TableCell><em>{funcionario.dataCadastro}</em></TableCell>

                          <TableCell align="center">
                            <div className="acoes-cell">
                              <Tooltip title="Ver perfil do funcionário">
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<EditIcon />}
                                  sx={{ ...actionBtnSx, bgcolor: "#37228B", color: "#fff", "&:hover": { bgcolor: "#2a1870" } }}
                                >
                                  Ver Perfil
                                </Button>
                              </Tooltip>

                              <Tooltip title="Excluir funcionário">
                                <Button
                                  variant="contained"
                                  size="small"
                                  startIcon={<DeleteIcon />}
                                  onClick={() => handleDeletarFuncionario(funcionario.id)}
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
                      <TableCell colSpan={6}>
                        <div className="livrossalvos-footer">
                          <span className="livrossalvos-exibindo">
                            {funcionariosFiltrados.length === 0
                              ? "Nenhum funcionário encontrado"
                              : `Exibindo ${from}–${to} de ${funcionariosFiltrados.length} funcionário(s)`}
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
