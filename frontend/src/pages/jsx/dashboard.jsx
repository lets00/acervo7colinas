import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PieChart } from "@mui/x-charts/PieChart";

// MUI X Charts
import { BarChart } from "@mui/x-charts/BarChart";
import BookCarousel from "../../components/jsx/BookCarrossel";
import AddReadingModal from "../../components/jsx/AddReadingModal";
import EditProgressDialog from "../../components/jsx/EditProgressDialog";
import Footer from "../../components/jsx/Footer";
import { isAuthenticated, getUsuario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import Header from "../../components/jsx/Header";
import SectionHeader from "../../components/jsx/SectionHeader";
import "../css/Dashboard.css";


const formataData = (d) => {
    if (!d) return null;
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
    const dt = new Date(d);
    const mes = String(dt.getMonth() + 1).padStart(2, "0");
    const dia = String(dt.getDate()).padStart(2, "0");
    return `${dt.getFullYear()}-${mes}-${dia}`;
};

/* ─── componente ─── */

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate]);

    const usuario = getUsuario();

    const [anchorEls, setAnchorEls] = useState({});
    const [livrosPorMesData, setLivrosPorMesData] = useState({ meses: [], valores: [] });
    const [generosData, setGenerosData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [progressData, setProgressData] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editValue, setEditValue] = useState(0);
    const [loadingProgresso, setLoadingProgresso] = useState(true);
    const [desejos, setDesejos] = useState([]);
    const [erroProgresso, setErroProgresso] = useState(null);
    const [erroDesejos, setErroDesejos] = useState(null);
    const [erroOperacao, setErroOperacao] = useState(null);

    // Gráfico 2 — páginas lidas por dia (últimos 7 dias, vindo do progresso real)
    const paginasPorDiaDados = useMemo(() => {
        const porDia = {};
        progressData.forEach((item) => {
            const dia = item.data ? formataData(item.data) : null;
            if (!dia) return;
            porDia[dia] = (porDia[dia] || 0) + (Number(item.paginasLidas) || 0);
        });

        const hoje = new Date();
        const ultimos7 = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(hoje);
            d.setDate(hoje.getDate() - i);
            const chave = formataData(d);
            ultimos7.push({
                data: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
                paginas: porDia[chave] || 0,
            });
        }

        const total = ultimos7.reduce((acc, d) => acc + d.paginas, 0);
        return { dados: ultimos7, total };
    }, [progressData]);

    const getUserId = () =>
        localStorage.getItem("user_id") || getUsuario()?.id;

    const mensagemErroApi = (status, recurso) => {
        if (status === 400) return `Dados inválidos ao buscar ${recurso}.`;
        if (status === 404) return `Usuário não encontrado ao buscar ${recurso}.`;
        if (status >= 500) return `Erro do servidor ao buscar ${recurso}.`;
        return `Não foi possível buscar ${recurso}.`;
    };

    // Buscar Progresso
    useEffect(() => {
        const userId = getUserId();
        if (!userId) {
            setErroProgresso("Usuário não identificado.");
            setLoadingProgresso(false);
            return;
        }

        fetch(`http://localhost:3000/usuarios/progresso?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error(mensagemErroApi(res.status, "o progresso"));
                return res.json();
            })
            .then((items) => setProgressData(Array.isArray(items) ? items : []))
            .catch((err) => setErroProgresso(err.message))
            .finally(() => setLoadingProgresso(false));
    }, []);

    // Buscar Futuras Leituras (Quero Ler)
    useEffect(() => {
        const userId = getUserId();
        if (!userId) {
            setErroDesejos("Usuário não identificado.");
            return;
        }

        fetch(`http://localhost:3000/usuario/queroler?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error(mensagemErroApi(res.status, "a lista Quero Ler"));
                return res.json();
            })
            .then((items) => setDesejos(Array.isArray(items) ? items.map((item) => item.Livro) : []))
            .catch((err) => setErroDesejos(err.message));
    }, []);
    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        fetch(`http://localhost:3000/usuarios/livros-por-mes?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        mensagemErroApi(res.status, "livros por mês")
                    );
                }

                return res.json();
            })
            .then((data) =>
                setLivrosPorMesData({
                    meses: data.map((d) => d.mes),
                    valores: data.map((d) => d.quantidade),
                })
            )
            .catch((err) => console.error(err));

        fetch(`http://localhost:3000/usuarios/generos?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        mensagemErroApi(res.status, "gêneros")
                    );
                }

                return res.json();
            })
            .then(setGenerosData)
            .catch((err) => console.error(err));
    }, []);

    const handleMenuOpen = (event, id) => {
        setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
    };

    const handleMenuClose = (id) => {
        setAnchorEls((prev) => ({ ...prev, [id]: null }));
    };

    const handleAddBook = async (livro, paginasLidas) => {
        const userId = Number(getUserId());

        if (!Number.isInteger(userId) || userId <= 0) {
            setErroOperacao("Usuário não identificado para salvar o progresso.");
            return;
        }

        try {
            setErroOperacao(null);
            const res = await fetch("http://localhost:3000/usuarios/progresso", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    livro_id: livro.id,
                    numero_de_paginas: Number(paginasLidas) || 0,
                }),
            });

            if (!res.ok) throw new Error(mensagemErroApi(res.status, "o progresso"));
            const novo = await res.json();

            setProgressData((prev) => {
                const existente = prev.some((item) => String(item.livro_id) === String(novo.livro_id));
                return existente
                    ? prev.map((item) => String(item.livro_id) === String(novo.livro_id) ? novo : item)
                    : [...prev, novo];
            });
            setModalOpen(false);
        } catch (err) {
            setErroOperacao(err.message);
        }
    };

    const handleEditOpen = (item) => {
        setEditingItem(item);
        setEditValue(item.paginasLidas);
        setEditDialogOpen(true);
    };

    const handleEditSave = async (novoValor) => {
        try {
            setErroOperacao(null);
            const res = await fetch("http://localhost:3000/usuarios/progresso", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: Number(getUserId()),
                    livro_id: Number(editingItem.livro_id),
                    numero_de_paginas: Number(novoValor),
                }),
            });

            if (!res.ok) throw new Error(mensagemErroApi(res.status, "o progresso"));
            const atualizado = await res.json();

            setProgressData((prev) =>
                prev.map((i) =>
                    String(i.id) === String(editingItem.id)
                        ? atualizado
                        : i
                )
            );
            setEditDialogOpen(false);
            setEditingItem(null);
        } catch (err) {
            setErroOperacao(err.message);
        }
    };

    const handleExcluir = async (item) => {
        try {
            setErroOperacao(null);
            const res = await fetch(`http://localhost:3000/usuarios/progresso/${item.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error(mensagemErroApi(res.status, "o progresso"));

            setProgressData((prev) => prev.filter((i) => String(i.id) !== String(item.id)));
            setEditingItem(null);
        } catch (err) {
            setErroOperacao(err.message);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#fff",
                mt: "-55px",
            }}
        >
            <Header />

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1440px",
                    px: { xs: "16px", sm: "28px", md: "60px" },
                    pb: "48px",
                }}
            >
                {/* SAUDAÇÃO */}
                <h1 className="dashboard-greeting">Olá, {usuario?.nomeCompleto ?? "usuário"}</h1>

                {erroOperacao && (
                    <Typography color="error" sx={{ py: 1 }}>
                        {erroOperacao}
                    </Typography>
                )}

                {/* PROGRESSO DE LEITURA */}
                <div className="section-header progress-custom">
                    <h3>Progresso de leitura</h3>

                    <IconButton className="add-button" onClick={() => setModalOpen(true)}>
                        <AddCircleIcon />
                    </IconButton>
                </div>

                <div className="progress-list">
                    {loadingProgresso ? (
                        <Typography sx={{ py: 2 }}>Carregando...</Typography>
                    ) : erroProgresso ? (
                        <Typography color="error" sx={{ py: 2 }}>{erroProgresso}</Typography>
                    ) : progressData.length === 0 ? (
                        <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                            Nenhuma leitura em andamento. Clique no botão + para adicionar um livro!
                        </Typography>
                    ) : (
                        progressData.map((item) => {
                            const percent = item.totalPaginas > 0
                                ? Math.round((item.paginasLidas / item.totalPaginas) * 100)
                                : 0;
                            return (
                                <div className="progress-card" key={item.id}>
                                    <div className="progress-card-header">
                                        <span className="progress-card-title">{item.titulo}</span>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                            <span className="progress-card-percent">{percent}%</span>
                                            <IconButton
                                                className="progress-menu-btn"
                                                size="medium"
                                                onClick={(e) => handleMenuOpen(e, item.id)}
                                                aria-label="opções"
                                            >
                                                <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEls[item.id]}
                                                open={Boolean(anchorEls[item.id])}
                                                onClose={() => handleMenuClose(item.id)}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                            >
                                                <MenuItem onClick={() => { handleMenuClose(item.id); handleEditOpen(item); }}>
                                                    Editar
                                                </MenuItem>
                                                <MenuItem onClick={() => { handleMenuClose(item.id); handleExcluir(item); }}>
                                                    Excluir
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </div>

                                    <LinearProgress
                                        variant="determinate"
                                        value={percent}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            bgcolor: "rgba(255,255,255,0.2)",
                                            "& .MuiLinearProgress-bar": {
                                                bgcolor: "#00A83F",
                                                borderRadius: 4,
                                            },
                                        }}
                                    />
                                    <span className="progress-card-pages">
                                        {item.paginasLidas} de {item.totalPaginas}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* DESTAQUES DE FUTURAS LEITURAS */}
                <SectionHeader title="Lista de futuras leituras" />
                {erroDesejos ? (
                    <Typography color="error" sx={{ py: 2 }}>{erroDesejos}</Typography>
                ) : desejos.length === 0 ? (
                    <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                        Nenhum livro na lista de futuras leituras.
                    </Typography>
                ) : (
                    <BookCarousel books={desejos} />
                )}

                {/* VISÃO GERAL */}
                <div style={{ marginBottom: "40px" }}>
                    <SectionHeader title="Visão geral" />
                </div>

                <div className="charts-grid">

                    {/* GRÁFICO 1 — LIVROS LIDOS POR MÊS */}
                    <div className="chart-card">
                        <p className="chart-card-title">
                            Nº de livros lidos por mês
                        </p>

                        {livrosPorMesData.meses.length === 0 ? (
                            <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                                Nenhum dado de livros por mês disponível.
                            </Typography>
                        ) : (
                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: "band",
                                        data: livrosPorMesData.meses,
                                        tickLabelStyle: { fontSize: 11 },
                                    },
                                ]}
                                series={[
                                    {
                                        data: livrosPorMesData.valores,
                                        label: "Livros",
                                        color: "#c770f0",
                                        valueFormatter: (value) => `${value} livros`,
                                    },
                                ]}
                                height={250}
                                margin={{
                                    left: 40,
                                    right: 16,
                                    top: 8,
                                    bottom: 28,
                                }}
                                slotProps={{
                                    legend: { hidden: true },
                                }}
                            />
                        )}
                    </div>

                    {/* GRÁFICO 2 — PÁGINAS LIDAS POR DIA */}
                    <div className="chart-card">
                        <p className="chart-card-title">
                            Nº de páginas lidas por dia
                        </p>

                        {paginasPorDiaDados.total === 0 ? (
                            <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                                Nenhuma página lida registrada ainda.
                            </Typography>
                        ) : (
                            <>
                                <Typography
                                    sx={{
                                        fontSize: 28,
                                        fontWeight: 700,
                                        color: "#37228B",
                                    }}
                                >
                                    {paginasPorDiaDados.total} páginas
                                </Typography>

                                <Typography
                                    color="rgba(0,0,0,0.6)"
                                    sx={{ mb: 1, fontSize: 13 }}
                                >
                                    nos últimos 7 dias
                                </Typography>

                                <BarChart
                                    dataset={paginasPorDiaDados.dados}
                                    height={250}
                                    xAxis={[
                                        {
                                            scaleType: "band",
                                            dataKey: "data",
                                            tickLabelStyle: { fontSize: 11 },
                                        },
                                    ]}
                                    yAxis={[
                                        {
                                            label: "Páginas",
                                            labelStyle: { fontSize: 11 },
                                        },
                                    ]}
                                    series={[
                                        {
                                            dataKey: "paginas",
                                            label: "Páginas",
                                            color: "#c770f0",
                                            valueFormatter: (value) =>
                                                `${value} páginas`,
                                        },
                                    ]}
                                    margin={{
                                        left: 40,
                                        right: 16,
                                        top: 8,
                                        bottom: 28,
                                    }}
                                    slotProps={{
                                        legend: { hidden: true },
                                    }}
                                />
                            </>
                        )}
                    </div>

                    {/* GRÁFICO 3 — GÊNEROS */}
                    <div className="chart-card">
                        <p className="chart-card-title">
                            Livros lidos por gênero
                        </p>

                        {generosData.length === 0 ? (
                            <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                                Nenhum dado de gênero disponível.
                            </Typography>
                        ) : (
                            <PieChart
                                series={[
                                    {
                                        data: generosData.map((item, index) => ({
                                            id: item.id ?? index,
                                            value: Number(
                                                item.value ?? item.quantidade ?? 0
                                            ),
                                            label:
                                                item.label ??
                                                item.genero ??
                                                "Sem gênero",
                                        })),
                                    },
                                ]}
                                height={250}
                                margin={{
                                    top: 10,
                                    bottom: 10,
                                    left: 10,
                                    right: 10,
                                }}
                                slotProps={{
                                    legend: {
                                        direction: "row",
                                        position: {
                                            vertical: "bottom",
                                            horizontal: "middle",
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>

                </div>
                <div className="footer-container">
                    <Footer />
                </div>
            </Box>

            <AddReadingModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddBook}
                livrosEmProgresso={progressData}
            />

            <EditProgressDialog
                open={editDialogOpen}
                item={editingItem}
                value={editValue}
                onChange={setEditValue}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleEditSave}
            />
        </Box>
    );
}