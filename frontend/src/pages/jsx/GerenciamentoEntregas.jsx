import { useCallback, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Footer from "../../components/jsx/Footer";
import Header from "../../components/jsx/Header";
import PageContent from "../../components/jsx/PageContent";
import api from "../../services/apis";
import { getToken } from "../../utils/auth";
import "../css/MeusEmprestimos.css";

const ROTA_ENTREGAS = "/entregas";
const rotaAtualizarStatus = (id) => `/entregas/${id}/status`;

function mapearEntrega(entrega) {
    const emprestimo = entrega.Emprestimo ?? entrega.emprestimo ?? {};
    const livro = emprestimo.Livro ?? emprestimo.livro ?? entrega.Livro ?? {};
    const usuario = emprestimo.Usuario ?? emprestimo.usuario ?? {};
    const entregador = entrega.Entregador ?? entrega.entregador ?? {};

    return {
        id: entrega.id,
        livro: livro.titulo ?? "Livro não informado",
        autor: livro.autor ?? "",
        entregador: entregador.nomeCompleto ?? entregador.nome ?? "Entregador não informado",
        emailEntregador: entregador.email ?? "",
        telefoneEntregador: entregador.telefone ?? "",
        destinatario: usuario.nomeCompleto ?? usuario.nome ?? "",
        endereco: entrega.endereco_entrega ?? "",
        solicitadaEm: entrega.created_at ?? entrega.createdAt,
        status: entrega.status,
    };
}

function formatarData(data) {
    if (!data) return "—";
    const dataFormatada = new Date(data);
    if (Number.isNaN(dataFormatada.getTime())) return "—";

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(dataFormatada);
}

function textoStatus(status) {
    if (status === "SAIU_DA_BIBLIOTECA") return "Saiu da biblioteca";
    if (status === "ENTREGADOR_ACEITOU") return "Entregador aceitou";
    return status ?? "Status não informado";
}

export default function GerenciamentoEntregas() {
    const [entregas, setEntregas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [atualizandoId, setAtualizandoId] = useState(null);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const carregarEntregas = useCallback(async () => {
        const token = getToken();
        if (!token) {
            setEntregas([]);
            setErro("Faça login como funcionário ou administrador para consultar as entregas.");
            setCarregando(false);
            return;
        }

        setCarregando(true);
        setErro("");
        setSucesso("");

        try {
            const { data } = await api.get(ROTA_ENTREGAS, {
                params: { status: "ENTREGADOR_ACEITOU" },
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!Array.isArray(data)) {
                setEntregas([]);
                setErro("A API de entregas deve retornar uma lista.");
                return;
            }

            setEntregas(data.map(mapearEntrega));
        } catch (error) {
            setErro(
                error.response?.status === 404
                    ? "A API para listar entregas aceitas ainda está aguardando implementação no backend."
                    : error.response?.data?.mensagem ?? "Não foi possível carregar as entregas aceitas."
            );
        } finally {
            setCarregando(false);
        }
    }, []);

    useEffect(() => {
        carregarEntregas();
    }, [carregarEntregas]);

    const marcarSaidaDaBiblioteca = async (entrega) => {
        const token = getToken();
        if (!token) {
            setErro("Sua sessão expirou. Faça login novamente.");
            return;
        }

        setAtualizandoId(entrega.id);
        setErro("");
        setSucesso("");

        try {
            await api.patch(
                rotaAtualizarStatus(entrega.id),
                { status: "SAIU_DA_BIBLIOTECA" },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setEntregas((atuais) =>
                atuais.map((item) =>
                    item.id === entrega.id
                        ? { ...item, status: "SAIU_DA_BIBLIOTECA" }
                        : item
                )
            );
            setSucesso(`O pedido de ${entrega.livro} foi marcado como saiu da biblioteca.`);
        } catch (error) {
            setErro(
                error.response?.status === 404
                    ? "A API para atualizar o status da entrega ainda está aguardando implementação no backend."
                    : error.response?.data?.mensagem ?? "Não foi possível atualizar o status da entrega."
            );
        } finally {
            setAtualizandoId(null);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#fff" }}>
            <Header />
            <PageContent>
                <main className="emprestimos-page">
                    <div className="emprestimos-topbar">
                        <div>
                            <h1 className="emprestimos-titulo">Gerenciamento de entregas</h1>
                            <Typography color="text.secondary" sx={{ mt: 1 }}>
                                Entregadores que aceitaram buscar livros na biblioteca.
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            startIcon={<AutorenewIcon />}
                            onClick={carregarEntregas}
                            disabled={carregando}
                            sx={{ textTransform: "none", borderColor: "#37228B", color: "#37228B" }}
                        >
                            Atualizar lista
                        </Button>
                    </div>

                    <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 3 }} />

                    {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}
                    {sucesso && <Alert severity="success" sx={{ mb: 2 }}>{sucesso}</Alert>}

                    <div className="emprestimos-table-wrapper">
                        <TableContainer>
                            <Table aria-label="Entregas aceitas pelos entregadores">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Livro</TableCell>
                                        <TableCell>Entregador</TableCell>
                                        <TableCell>Destinatário</TableCell>
                                        <TableCell>Endereço de entrega</TableCell>
                                        <TableCell>Solicitado em</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Ação</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carregando ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                                                <CircularProgress size={24} aria-label="Carregando entregas" />
                                            </TableCell>
                                        </TableRow>
                                    ) : entregas.length === 0 && erro ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#666" }}>
                                                A lista de entregas não está disponível.
                                            </TableCell>
                                        </TableRow>
                                    ) : entregas.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center" sx={{ py: 4, color: "#666" }}>
                                                Nenhuma entrega aceita aguardando retirada.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        entregas.map((entrega) => {
                                            const podeMarcarSaida = entrega.status === "ENTREGADOR_ACEITOU";
                                            return (
                                                <TableRow key={entrega.id}>
                                                    <TableCell>
                                                        <strong>{entrega.livro}</strong>
                                                        {entrega.autor && (
                                                            <Typography variant="body2" color="text.secondary">
                                                                {entrega.autor}
                                                            </Typography>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <LocalShippingIcon fontSize="small" color="primary" />
                                                            <Box>
                                                                <div>{entrega.entregador}</div>
                                                                {entrega.telefoneEntregador && (
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {entrega.telefoneEntregador}
                                                                    </Typography>
                                                                )}
                                                                {entrega.emailEntregador && (
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {entrega.emailEntregador}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{entrega.destinatario || "—"}</TableCell>
                                                    <TableCell>{entrega.endereco || "—"}</TableCell>
                                                    <TableCell>{formatarData(entrega.solicitadaEm)}</TableCell>
                                                    <TableCell>{textoStatus(entrega.status)}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            startIcon={
                                                                atualizandoId === entrega.id
                                                                    ? <CircularProgress size={16} />
                                                                    : <TaskAltIcon />
                                                            }
                                                            disabled={!podeMarcarSaida || atualizandoId !== null}
                                                            onClick={() => marcarSaidaDaBiblioteca(entrega)}
                                                            sx={{
                                                                borderColor: "#37228B",
                                                                color: "#37228B",
                                                                textTransform: "none",
                                                                whiteSpace: "nowrap",
                                                            }}
                                                        >
                                                            {atualizandoId === entrega.id ? "Atualizando..." : "Confirmar saída"}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </main>
            </PageContent>
            <Footer />
        </Box>
    );
}
