import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "../css/informacaoLivros.css";
import SectionHeader from "../../components/jsx/SectionHeader";
import BookCarousel from "../../components/jsx/BookCarrossel";
import Comentario from "../../components/jsx/comentario";
import Header from "../../components/jsx/Header";
import Footer from "../../components/jsx/Footer";


import iconInfo from "../../assets/info.png";
import iconCalendario from "../../assets/calendario.png";
import iconIsbn from "../../assets/isbn.png";
import iconLivroAberto from "../../assets/livro-aberto.png";
import iconLivroFechado from "../../assets/livro-fechado.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

// ⭐ MUI Rating
import Rating from "@mui/material/Rating";

function InformacaoLivro() {
    const { id } = useParams();
    const destaquesRef = useRef(null);

    const [livro, setLivro] = useState(null);
    const [exemplares, setExemplares] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [relacionados, setRelacionados] = useState([]);
    const descricaoRef = useRef(null);
    const [expandido, setExpandido] = useState(false);
    const [descricaoOverflow, setDescricaoOverflow] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/livros/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Livro não encontrado");
                }
                return res.json();
            })
            .then(data => setLivro(data))
            .catch(() => {
                console.log("Livro não encontrado na API");
                setLivro(null);
            });

        fetch(`http://localhost:3000/livros/${id}/exemplares`)
            .then(res => res.json())
            .then(data => setExemplares(data))
            .catch(() => setExemplares([]));

        fetch(`http://localhost:3000/livros/${id}/avaliacoes`)
            .then(res => res.json())
            .then(data => setAvaliacoes(Array.isArray(data) ? data : []))
            .catch(() => setAvaliacoes([]));

        fetch(`http://localhost:3000/livros`)
            .then(res => res.json())
            .then(data => setRelacionados(data))
            .catch(() => setRelacionados([]));

    }, [id]);

    useEffect(() => {
        if (descricaoRef.current) {
            setDescricaoOverflow(descricaoRef.current.scrollHeight > descricaoRef.current.clientHeight);
        }
    }, [livro]);

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const livrosRelacionados = relacionados.filter(
        b => b.genero === livro?.genero && b.id !== livro?.id
    );

    if (!livro) return <p>Carregando...</p>;

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            bgcolor: "#fff",
            marginTop: "-55px"
        }}>

            <Header />
            <Box sx={{ width: "100%", maxWidth: "1250px", px: 2, marginLeft: "60px", marginRight: "60px" }}>

                {/* 🔥 TOPO DO LIVRO */}
                <div className="livro-info-topo">

                    <div className="livro-capa-container">
                        <img
                            src={livro.img ? `http://localhost:3000${livro.img}` : ""}
                            alt={livro.titulo}
                            className="livro-capa"
                        />

                        <Button
                            variant="contained"
                            className="btn-prateleira"
                        >
                            ADICIONAR À PRATELEIRA
                        </Button>
                    </div>

                    <div className="livro-detalhes">
                        <h1>{livro.titulo}</h1>
                        <h3>{livro.autor}</h3>

                        <div className="livro-avaliacao">
                            <Rating value={livro.avaliacao || 0} precision={0.5} readOnly />
                            <span>{livro.avaliacao}</span>
                        </div>
                        <div className="livro-meta">

                            <div className="meta-item">
                                <img src={iconLivroFechado} alt="editora" />
                                <span>{livro.editora}</span>
                            </div>

                            <div className="meta-item">
                                <img src={iconLivroAberto} alt="paginas" />
                                <span>{livro.paginas} páginas</span>
                            </div>

                            <div className="meta-item">
                                <img src={iconCalendario} alt="ano" />
                                <span>{livro.ano}</span>
                            </div>

                            <div className="meta-item">
                                <img src={iconIsbn} alt="isbn" />
                                <span>ISBN: {livro.isbn}</span>
                            </div>

                            <div className="meta-item">
                                <img src={iconInfo} alt="idioma" />
                                <span>{livro.idioma}</span>
                            </div>

                        </div>

                        <div className="livro-generos">
                            <p>Gêneros:</p>
                            <span>{livro.genero}</span>
                        </div>

                        <div className="descricao-container">
                            <p ref={descricaoRef} className={expandido ? "livro-descricao aberta" : "livro-descricao"}>
                                {livro.descricao}
                            </p>

                            {descricaoOverflow && (
                                <div className="ver-mais-container">
                                    <Button
                                        className="btn-ver-mais"
                                        onClick={() => setExpandido(!expandido)}
                                        endIcon={
                                            <ExpandMoreIcon
                                                style={{
                                                    transform: expandido ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "0.3s"
                                                }}
                                            />
                                        }
                                    >
                                        {expandido ? "Ver menos" : "Ver mais"}
                                    </Button>
                                </div>
                            )}
                        </div>


                    </div>

                </div>

                <SectionHeader title="Exemplares" />

                <div className="exemplares-section">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>SEÇÃO</TableCell>
                                    <TableCell>DISPONIBILIDADE</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {exemplares.map((exemplar) => (
                                    <TableRow key={exemplar.id}>
                                        <TableCell>{exemplar.id}</TableCell>
                                        <TableCell>{exemplar.secao}</TableCell>
                                        <TableCell>
                                            {exemplar.disponivel ? "Disponível" : "Indisponível"}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <SectionHeader title="Os leitores também gostaram" />
                {livrosRelacionados.length > 0 ? (
                    <BookCarousel books={livrosRelacionados} />
                ) : (
                    <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                        Nenhum outro livro deste gênero disponível.
                    </p>
                )}

                <div style={{ height: "70px" }}>
                    <SectionHeader title="Avaliações e comentários" />
                </div>

                <div className="avaliacoes">
                    {avaliacoes.map((av) => (
                        <Comentario
                            key={av.id}
                            usuario={av.usuario}
                            comentario={av.comentario}
                            nota={av.avaliacao}
                            tempo={av.tempo}
                        />
                    ))}
                </div>
                <div className="container-footer"><Footer /> </div>
                

            </Box>
        </Box>
    );
}

export default InformacaoLivro;