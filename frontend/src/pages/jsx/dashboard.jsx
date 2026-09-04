import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// MUI X Charts
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import BookCarousel from "../../components/jsx/BookCarrossel";
import AddReadingModal from "../../components/jsx/AddReadingModal";
import EditProgressDialog from "../../components/jsx/EditProgressDialog";
import Footer from "../../components/jsx/Footer";
import { isAuthenticated, getUsuario } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

import Header from "../../components/jsx/Header";
import SectionHeader from "../../components/jsx/SectionHeader";
import "../css/Dashboard.css";

/* ─── dados mockados ─── */

const statsData = [
    { label: "Quero ler", value: 12 },
    { label: "Lendo", value: 3 },
    { label: "Emprestado", value: 2 },
    { label: "Total de lidos", value: 47 },
    { label: "Favoritos", value: 8 },
];

const progressDataInicial = [
    { id: 1, titulo: "1984 – George Orwell", paginasLidas: 60, totalPaginas: 200 },
    { id: 2, titulo: "Cem Anos de Solidão – García Márquez", paginasLidas: 130, totalPaginas: 417 },
];

// Gráfico 1 — livros por mês (horizontal bar)
const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const livrosPorMes = [3, 5, 2, 8, 6, 12, 9, 14, 11, 7, 18, 22];

// Gráfico 2 — páginas por dia (dados reais do progresso de leitura)
const formataData = (d) => {
    if (!d) return null;
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
    const dt = new Date(d);
    const mes = String(dt.getMonth() + 1).padStart(2, "0");
    const dia = String(dt.getDate()).padStart(2, "0");
    return `${dt.getFullYear()}-${mes}-${dia}`;
};

// Gráfico 3 — gêneros (pizza)
const generos = [
    { id: 0, value: 45, label: "Ficção", color: "#c770f0" },
    { id: 1, value: 30, label: "Romance", color: "#4fc3f7" },
    { id: 2, value: 25, label: "Mistério", color: "#00e676" },
    { id: 3, value: 10, label: "Terror", color: "#7c4dff" },
];

/* ─── componente ─── */

export default function Dashboard() {
    // teste de uso do login obrigatório com redirecionamento
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/login");
        }
    }, [navigate])

    const [anchorEls, setAnchorEls] = useState({});
    const [destaques, setDestaques] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [progressData, setProgressData] = useState(progressDataInicial);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [editValue, setEditValue] = useState(0);
    const [loadingProgresso, setLoadingProgresso] = useState(true);
    const [desejos, setDesejos] = useState([]);

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


    const scroll = (ref, direction) => {
        if (!ref.current) return;

        const containerWidth = ref.current.clientWidth;

        ref.current.scrollBy({
            left: direction === "left" ? -containerWidth * 0.8 : containerWidth * 0.8,
            behavior: "smooth"
        });
    };

    const getUserId = () =>
        localStorage.getItem("user_id") || getUsuario()?.id;

    useEffect(() => {
        const userId = getUserId();
        if (!userId) {
            console.error("Usuário não autenticado");
            setLoadingProgresso(false); // sem isso, o loading fica travado pra sempre
            return;
        }

        fetch(`http://localhost:3000/usuarios/progresso?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Falha ao buscar progresso");
                return res.json();
            })
            .then(setProgressData)
            .catch((err) => console.error(err))
            .finally(() => setLoadingProgresso(false));
    }, []);

    useEffect(() => {
        const userId = getUserId();
        if (!userId) return;

        fetch(`http://localhost:3000/usuario/queroler?user_id=${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Falha ao buscar lista de futuras leituras");
                return res.json();
            })
            .then((items) => setDesejos(items.map((d) => d.Livro)))
            .catch((err) => console.error(err));
    }, []);


    const handleMenuOpen = (event, id) => {
        setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
    };

    const handleMenuClose = (id) => {
        setAnchorEls((prev) => ({ ...prev, [id]: null }));
    };

    const handleAddBook = async (livro, paginasLidas) => {
        const userId = getUserId(); 

        if (!userId) {
            console.error("Usuário não autenticado");
            return;
        }

        const res = await fetch("http://localhost:3000/usuarios/progresso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                livro_id: livro.id,
                numero_de_paginas: Number(paginasLidas) || 0,
            }),
        });
        const novo = await res.json(); //esperar debora, para saber quais dados vao retorna, para atualizar a lista de progresso com o novo livro

        setProgressData((prev) => [
            ...prev,
            {
                id: novo.id ?? novo.progresso_id,
                livro_id: livro.id,
                titulo: `${livro.titulo} – ${livro.autor}`,
                paginasLidas: novo.numero_de_paginas_lidas ?? (Number(paginasLidas) || 0),
                totalPaginas: novo.totalPaginas ?? (Number(livro.quantidadePaginas) || 0),
                data: novo.data,
            },
        ]);
        setModalOpen(false);
    };
        

    const handleEditOpen = (item) => {
        setEditingItem(item);
        setEditValue(item.paginasLidas);
        setEditDialogOpen(true);
    };

    const handleEditSave = async (novoValor) => {
        await fetch("http://localhost:3000/usuarios/progresso", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: getUserId(),
                livro_id: editingItem.livro_id,
                numero_de_paginas: novoValor,
            }),
        });

        setProgressData((prev) =>
            prev.map((i) =>
                String(i.id) === String(editingItem.id)
                    ? { ...i, paginasLidas: novoValor }
                    : i
            )
        );
        setEditDialogOpen(false);
        setEditingItem(null);
    };

    const handleExcluir = async (item) => {
        await fetch(`http://localhost:3000/usuarios/progresso/${item.id}`, {
            method: "DELETE",
        });

        setProgressData((prev) => prev.filter((i) => String(i.id) !== String(item.id)));
        setEditingItem(null);
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
                <h1 className="dashboard-greeting">Olá, Jamille Galdino</h1>

                {/* CARDS DE ESTATÍSTICAS */}
                <div className="stats-grid">
                    {statsData.map((stat) => (
                        <div className="stat-card" key={stat.label}>
                            <span className="stat-card-label">{stat.label}</span>

                            <div className="stat-card-center">
                                <span className="stat-card-value">{stat.value}</span>
                                <span className="stat-card-sub">livros</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PROGRESSO DE LEITURA */}
                {/* SectionHeader adaptado com botão + ao lado */}
                <div className="section-header progress-custom">
                    <h3>Progresso de leitura</h3>

                    <IconButton className="add-button" onClick={() => setModalOpen(true)}>
                        <AddCircleIcon />
                    </IconButton>
                </div>

                <div className="progress-list">
                    {loadingProgresso ? (
                        <Typography sx={{ py: 2 }}>Carregando...</Typography>
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


                {/* DESTAQUES */}

                <SectionHeader title="Lista de futuras leituras" />
                {desejos.length === 0 ? (
                    <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                        Nenhum livro na lista de futuras leituras.
                    </Typography>
                ) : (
                    <BookCarousel books={desejos} />
                )}

                {/* historico de leituras */}

                <SectionHeader title="Histórico" />
                {destaques.length === 0 ? (
                    <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                        Nenhum livro finalizado.
                    </Typography>
                ) : (
                    <BookCarousel books={destaques} />
                )}





                {/* VISÃO GERAL */}
                <div style={{ marginBottom: "40px" }}>
                    <SectionHeader title="Visão geral" />
                </div>

                <div className="charts-grid">
                    {/* Gráfico 1 — Livros lidos por mês (barras horizontais) */}
                    <div className="chart-card">
                        <p className="chart-card-title">Nº de livros lidos por mês</p>
                        <BarChart
                            layout="horizontal"
                            height={280}
                            yAxis={[{ scaleType: "band", data: meses, tickLabelStyle: { fontSize: 11 } }]}
                            xAxis={[{ label: "Quantidade de livros", labelStyle: { fontSize: 11 } }]}
                            series={[{ data: livrosPorMes, label: "livros", color: "#00A83F" }]}
                            margin={{ left: 42, right: 16, top: 8, bottom: 40 }}
                            slotProps={{ legend: { labelStyle: { fontSize: 11 } } }}
                        />
                    </div>

                    {/* Gráfico 2 — Páginas lidas por dia (barras, últimos 7 dias) */}
                    <div className="chart-card">
                        <p className="chart-card-title">Nº de páginas lidas por dia</p>
                        {paginasPorDiaDados.total === 0 ? (
                            <Typography color="rgba(0,0,0,0.6)" sx={{ py: 2 }}>
                                Nenhuma página lida registrada ainda.
                            </Typography>
                        ) : (
                            <>
                                <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#37228B" }}>
                                    {paginasPorDiaDados.total} páginas
                                </Typography>
                                <Typography color="rgba(0,0,0,0.6)" sx={{ mb: 1, fontSize: 13 }}>
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
                                    yAxis={[{ label: "Páginas", labelStyle: { fontSize: 11 } }]}
                                    series={[
                                        {
                                            dataKey: "paginas",
                                            label: "Páginas",
                                            color: "#c770f0",
                                            valueFormatter: (value) => `${value} páginas`,
                                        },
                                    ]}
                                    margin={{ left: 40, right: 16, top: 8, bottom: 28 }}
                                    slotProps={{ legend: { hidden: true } }}
                                />
                            </>
                        )}
                    </div>

                    {/* Gráfico 3 — Gêneros mais lidos (pizza) */}
                    <div className="chart-card">
                        <p className="chart-card-title">Gêneros mais lidos por mim</p>
                        <PieChart
                            height={280}
                            series={[
                                {
                                    data: generos,
                                    innerRadius: 0,
                                    outerRadius: 90,
                                    paddingAngle: 2,
                                    cornerRadius: 3,
                                    cx: 100,
                                },
                            ]}
                            margin={{ left: 0, right: 120, top: 8, bottom: 8 }}
                            slotProps={{
                                legend: {
                                    direction: "column",
                                    position: { vertical: "middle", horizontal: "right" },
                                    labelStyle: { fontSize: 11 },
                                },
                            }}
                        />
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