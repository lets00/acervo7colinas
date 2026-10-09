import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";

import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";
import { useEmprestimo } from "../../context/EmprestimoContext";
import { getUsuario } from "../../utils/auth";
import "../css/SolicitacaoListaEmprestimo.css";

const LIMITE_EMPRESTIMOS_ATIVOS = 3;

function coverSrc(livro) {
    if (!livro?.img) return null;

    if (livro.img.startsWith("http")) return livro.img;
    if (livro.img.startsWith("/")) return `http://localhost:3000${livro.img}`;
    return livro.img;
}

function SolicitacaoListaEmprestimo() {
    const navigate = useNavigate();
    const { livros: carrinho, setLivros: setCarrinho, removerLivro: removerLivroCarrinho } = useEmprestimo();

    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [selecionados, setSelecionados] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [emprestimosAtivosUsuario, setEmprestimosAtivosUsuario] = useState(0);

    const vagasRestantes = Math.max(0, LIMITE_EMPRESTIMOS_ATIVOS - emprestimosAtivosUsuario);

    useEffect(() => {
        let ativo = true;

        const carregar = async () => {
            if (carrinho.length === 0) {
                setLivros([]);
                setSelecionados([]);
                setCarregando(false);
                return;
            }

            setCarregando(true);

            try {
                const userId = localStorage.getItem("user_id") || getUsuario()?.id;

                const [livrosRes, exemplaresRes, emprestimosRes] = await Promise.all([
                    fetch("http://localhost:3000/livros"),
                    fetch("http://localhost:3000/exemplares"),
                    userId
                        ? fetch(`http://localhost:3000/emprestimos?user_id=${userId}`)
                        : Promise.resolve(null),
                ]);

                if (!ativo) return;

                const livrosApi = await livrosRes.json();
                const exemplares = await exemplaresRes.json();
                const emprestimosUsuario = emprestimosRes ? await emprestimosRes.json() : [];

                const totalAtivos = Array.isArray(emprestimosUsuario)
                    ? emprestimosUsuario.filter(e => !e.is_devolvido).length
                    : 0;
                const vagas = Math.max(0, LIMITE_EMPRESTIMOS_ATIVOS - totalAtivos);

                const livrosAtualizados = carrinho.map(livroCarrinho => {
                    const naApi = livrosApi.find(l => Number(l.id) === Number(livroCarrinho.id));
                    const base = naApi ?? livroCarrinho;

                    return {
                        ...base,
                        disponivel: exemplares.some(
                            e => Number(e.id_livro) === Number(base.id) && e.disponivel
                        ),
                    };
                });

                if (!ativo) return;

                setEmprestimosAtivosUsuario(totalAtivos);
                setLivros(livrosAtualizados);
                setSelecionados(
                    livrosAtualizados.filter(l => l.disponivel).map(l => l.id).slice(0, vagas)
                );
            } catch {
                if (!ativo) return;
                setLivros(carrinho);
                setSelecionados([]);
            } finally {
                if (ativo) setCarregando(false);
            }
        };

        carregar();

        return () => {
            ativo = false;
        };
    }, [carrinho]);

    const toggleLivro = (id) => {
        setSelecionados(prev => {
            if (prev.includes(id)) return prev.filter(x => x !== id);
            if (prev.length >= vagasRestantes) return prev;
            return [...prev, id];
        });
    };

    const removerLivro = (id) => {
        removerLivroCarrinho(id);
        setSelecionados(prev => prev.filter(x => x !== id));
    };

    const livrosSelecionados = livros.filter(l => selecionados.includes(l.id));
    const quantidade = livrosSelecionados.length;
    const contador = quantidade === 1
        ? "1 livro selecionado"
        : `${quantidade} livros selecionados`;

    const handleSolicitar = async () => {
        const userId = localStorage.getItem("user_id") || getUsuario()?.id;

        if (!userId) {
            setFeedback({ severidade: "error", mensagem: "Faça login para solicitar um empréstimo." });
            return;
        }

        setEnviando(true);

        try {
            const { data } = await axios.post("http://localhost:3000/emprestimos", {
                user_id: Number(userId),
                livro_ids: livrosSelecionados.map(livro => Number(livro.id)),
            });

            setFeedback({ severidade: "success", mensagem: data.mensagem });
            setSelecionados([]);
            setCarrinho([]);
        } catch (error) {
            setFeedback({
                severidade: "error",
                mensagem: error.response?.data?.mensagem ?? "Não foi possível registrar a solicitação.",
            });
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", bgcolor: "#fff", mt: "-55px" }}>
            <Header />

            <Box sx={{ width: "100%", maxWidth: "1214px", mx: "auto", px: { xs: 2, sm: 3, md: 0 }, pb: "48px" }}>
                <Box className="sol-page">

                    <Typography className="sol-cabecalho-titulo" component="h1">
                        Minha solicitação de empréstimo
                    </Typography>
                    <Typography className="sol-subtitulo">
                        Confira os livros que você deseja pegar emprestados.
                    </Typography>

                    {!carregando && (vagasRestantes < livros.length || emprestimosAtivosUsuario > 0) && (
                        <Typography sx={{ fontSize: 13, color: "#888", mt: "4px" }}>
                            {emprestimosAtivosUsuario > 0
                                ? `Você já possui ${emprestimosAtivosUsuario} empréstimo(s) ativo(s) — `
                                : ""}
                            Você pode solicitar até {vagasRestantes} livro(s) por vez (limite de {LIMITE_EMPRESTIMOS_ATIVOS} empréstimos simultâneos).
                        </Typography>
                    )}

                    {carregando ? (
                        <Typography className="sol-vazio">Carregando...</Typography>
                    ) : livros.length === 0 ? (
                        <Typography className="sol-vazio">
                            Nenhum livro na lista.
                        </Typography>
                    ) : (
                        <Stack spacing={0} divider={<Divider orientation="horizontal" flexItem sx={{ borderColor: "#e5e5e5" }} />} className="sol-lista">
                            {livros.map(livro => {
                                const marcado = selecionados.includes(livro.id);
                                const bloqueadoPorLimite = livro.disponivel && !marcado && selecionados.length >= vagasRestantes;

                                const checkbox = (
                                    <Checkbox
                                        checked={marcado}
                                        disabled={!livro.disponivel || bloqueadoPorLimite}
                                        onChange={() => toggleLivro(livro.id)}
                                        sx={{
                                            color: "#37228B",
                                            mt: "6px",
                                            "&.Mui-checked": { color: "#37228B" },
                                            "&.Mui-disabled": { color: "#c9c9c9" },
                                        }}
                                    />
                                );

                                return (
                                    <Stack
                                        key={livro.id}
                                        direction="row"
                                        alignItems="flex-start"
                                        spacing={{ xs: 1.5, md: 2 }}
                                        className="sol-item"
                                    >
                                        {bloqueadoPorLimite ? (
                                            <Tooltip title={`Limite de ${LIMITE_EMPRESTIMOS_ATIVOS} empréstimos simultâneos atingido. Desmarque outro livro para trocar.`}>
                                                <span>{checkbox}</span>
                                            </Tooltip>
                                        ) : checkbox}

                                        <Box component="img" src={coverSrc(livro)} alt={livro.titulo} className="sol-capa" />

                                        <Box className="sol-info" sx={{ flex: 1, minWidth: 0 }}>
                                            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                                                <Typography className="sol-livro-titulo">{livro.titulo}</Typography>
                                                <Button className="sol-remover" onClick={() => removerLivro(livro.id)}>
                                                    REMOVER
                                                </Button>
                                            </Stack>

                                            <Typography className="sol-livro-autor">{livro.autor}</Typography>

                                            <Typography className="sol-livro-genero">
                                                Gêneros: <span className="sol-genero-link">{livro.genero}</span>
                                            </Typography>

                                            <span className={`sol-etiqueta ${livro.disponivel ? "disponivel" : "indisponivel"}`}>
                                                {livro.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
                                            </span>
                                        </Box>
                                    </Stack>
                                );
                            })}
                        </Stack>
                    )}

                    <Divider sx={{ my: 3, borderColor: "#e0e0e0" }} />

                    <Box className="sol-rodape">
                        <Typography className="sol-contador">{contador}</Typography>
                        <Typography className="sol-revisar">Revise antes de enviar</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0 }}>
                        <Button
                            variant="contained"
                            className="sol-botao"
                            disabled={quantidade === 0 || quantidade > vagasRestantes || enviando}
                            onClick={handleSolicitar}
                        >
                            {enviando ? "ENVIANDO..." : "SOLICITAR EMPRÉSTIMO"}
                        </Button>
                    </Box>

                    <Snackbar
                        open={Boolean(feedback)}
                        autoHideDuration={6000}
                        onClose={() => {
                            const sucesso = feedback?.severidade === "success";
                            setFeedback(null);
                            if (sucesso) navigate("/meus-emprestimos");
                        }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert
                            severity={feedback?.severidade ?? "info"}
                            variant="filled"
                            onClose={() => {
                                const sucesso = feedback?.severidade === "success";
                                setFeedback(null);
                                if (sucesso) navigate("/meus-emprestimos");
                            }}
                        >
                            {feedback?.mensagem}
                        </Alert>
                    </Snackbar>

                </Box>

                <div className="container-footer"><Footer /></div>
            </Box>
        </Box>
    );
}

export default SolicitacaoListaEmprestimo;