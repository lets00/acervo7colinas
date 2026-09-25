import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";
import "../css/SolicitacaoListaEmprestimo.css";

// Capas locais usadas nos dados de teste (acesso direto à página)
import MaxtonHall from "../../assets/MaxtonHall.jpg";
import SociedadeVampiros from "../../assets/SociedadeVampiros.jpg";
import UmBeijo from "../../assets/UmBeijo.jpg";
import UmPerfeitoCavalheiro from "../../assets/UmPerfeitoCavalheiro.jpg";
import Vergonha from "../../assets/Vergonha.jpg";

const MOCK_LIVROS = [
    { id: 1, titulo: "Um Perfeito Cavalheiro", autor: "Lisa Kleypas", genero: "Romance", img: UmPerfeitoCavalheiro, disponivel: true },
    { id: 2, titulo: "Um Beijo Inesquecível", autor: "Nicholas Sparks", genero: "Romance", img: UmBeijo, disponivel: true },
    { id: 3, titulo: "Sociedade dos Vampiros", autor: "Richelle Mead", genero: "Fantasia", img: SociedadeVampiros, disponivel: false },
    { id: 4, titulo: "Maxton Hall", autor: "Mona Kasten", genero: "Romance", img: MaxtonHall, disponivel: true },
    { id: 5, titulo: "Vergonha", autor: "Tarryn Fisher", genero: "Thriller", img: Vergonha, disponivel: false },
];

function coverSrc(livro) {
    if (!livro?.img) return null;

    if (livro.img.startsWith("http")) return livro.img;
    if (livro.img.startsWith("/")) return `http://localhost:3000${livro.img}`;
    return livro.img;
}

function SolicitacaoListaEmprestimo() {
    const { state } = useLocation();
    const livroDaNavegacao = state?.livro;
    const livroInicialId = livroDaNavegacao?.id ?? null;
    const livroFallbackRef = useRef(livroDaNavegacao);

    const [livros, setLivros] = useState(() => {
        if (livroDaNavegacao) {
            return [{ ...livroDaNavegacao, disponivel: true }];
        }
        return MOCK_LIVROS;
    });
    const [carregando, setCarregando] = useState(true);
    const [selecionados, setSelecionados] = useState([]);

    useEffect(() => {
        let ativo = true;

        const carregar = async () => {
            try {
                const [livrosRes, exemplaresRes] = await Promise.all([
                    fetch("http://localhost:3000/livros"),
                    fetch("http://localhost:3000/exemplares"),
                ]);

                if (!ativo) return;

                const livrosApi = await livrosRes.json();
                const exemplares = await exemplaresRes.json();

                const livrosComDisponibilidade = livrosApi.map(livro => ({
                    ...livro,
                    disponivel: exemplares.some(
                        e => Number(e.id_livro) === Number(livro.id) && e.disponivel
                    ),
                }));

                if (livroInicialId) {
                    const naApi = livrosComDisponibilidade.find(
                        l => Number(l.id) === Number(livroInicialId)
                    );
                    const base = naApi ?? livroFallbackRef.current;

                    if (base) {
                        setLivros([{
                            ...base,
                            id: base.id ?? livroInicialId,
                            disponivel: naApi
                                ? naApi.disponivel
                                : exemplares.some(
                                    e => Number(e.id_livro) === Number(base.id) && e.disponivel
                                ),
                        }]);
                    } else {
                        setLivros([]);
                    }
                } else {
                    setLivros(livrosComDisponibilidade);
                }
            } catch {
                if (!ativo) return;
            } finally {
                if (ativo) setCarregando(false);
            }
        };

        carregar();

        return () => {
            ativo = false;
        };
    }, [livroInicialId]);

    const toggleLivro = (id) => {
        setSelecionados(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const removerLivro = (id) => {
        setLivros(prev => prev.filter(l => l.id !== id));
        setSelecionados(prev => prev.filter(x => x !== id));
    };

    const livrosSelecionados = livros.filter(l => selecionados.includes(l.id));
    const quantidade = livrosSelecionados.length;
    const contador = quantidade === 1
        ? "1 livro selecionado"
        : `${quantidade} livros selecionados`;

    const handleSolicitar = () => {
        // TODO: enviar livrosSelecionados para o backend (endpoint de empréstimo ainda não existe).
        // A solicitação NÃO deve ser marcada como concluída antes da resposta do servidor.
        console.log("Solicitação preparada:", livrosSelecionados);
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

                                return (
                                    <Stack
                                        key={livro.id}
                                        direction="row"
                                        alignItems="center"
                                        spacing={{ xs: 1.5, md: 2 }}
                                        className="sol-item"
                                    >
                                        <Checkbox
                                            checked={marcado}
                                            disabled={!livro.disponivel}
                                            onChange={() => toggleLivro(livro.id)}
                                            sx={{
                                                color: "#37228B",
                                                "&.Mui-checked": { color: "#37228B" },
                                                "&.Mui-disabled": { color: "#c9c9c9" },
                                            }}
                                        />

                                        <Box component="img" src={coverSrc(livro)} alt={livro.titulo} className="sol-capa" />

                                        <Box className="sol-info" sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography className="sol-livro-titulo">{livro.titulo}</Typography>
                                            <Typography className="sol-livro-autor">{livro.autor}</Typography>
                                            <Typography className="sol-livro-genero">{livro.genero}</Typography>
                                        </Box>

                                        <span className={`sol-etiqueta ${livro.disponivel ? "disponivel" : "indisponivel"}`}>
                                            {livro.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL"}
                                        </span>

                                        <Button className="sol-remover" onClick={() => removerLivro(livro.id)}>
                                            REMOVER
                                        </Button>
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
                            disabled={quantidade === 0}
                            onClick={handleSolicitar}
                        >
                            SOLICITAR EMPRÉSTIMO
                        </Button>
                    </Box>

                </Box>

                <div className="container-footer"><Footer /></div>
            </Box>
        </Box>
    );
}

export default SolicitacaoListaEmprestimo;