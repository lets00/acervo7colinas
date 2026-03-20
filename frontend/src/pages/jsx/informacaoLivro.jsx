import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "../css/informacaoLivros.css";
import SectionHeader from "../../components/SectionHeader";
import BookCard from "../../components/BookCard";
import Comentario from "../../components/comentario";

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

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

    useEffect(() => {
        fetch(`http://localhost:3000/livros/${id}`)
            .then(res => res.json())
            .then(data => setLivro(data));

        fetch(`http://localhost:3000/livros/${id}/exemplares`)
            .then(res => res.json())
            .then(data => setExemplares(data));

        fetch(`http://localhost:3000/livros/${id}/avaliacoes`)
            .then(res => res.json())
            .then(data => setAvaliacoes(data));

        fetch(`http://localhost:3000/livros/${id}/relacionados`)
            .then(res => res.json())
            .then(data => setRelacionados(data));

    }, [id]);

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    if (!livro) return <p>Carregando...</p>;

    return (
        <div className="page-informacao-livro">

            {/* 🔥 TOPO DO LIVRO */}
            <div className="livro-info-topo">

                <div className="livro-capa-container">
                    <img
                        src={`http://localhost:3000${livro.img}`}
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
                        <Rating value={livro.avaliacao} precision={0.5} readOnly />
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
                        {livro.generos.map((g, index) => (
                            <span key={index}>{g}</span>
                        ))}
                    </div>

                    <p className="livro-descricao">{livro.descricao}</p>
                </div>

            </div>

            {/* 📚 EXEMPLARES */}
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

            {/* 📖 RELACIONADOS */}
            <SectionHeader title="Os leitores também gostaram" />

            <div className="carousel-container">

                <IconButton onClick={() => scrollLeft(destaquesRef)}>
                    <ChevronLeftIcon />
                </IconButton>

                <div className="books-container" ref={destaquesRef}>
                    {relacionados.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            imagem={`http://localhost:3000${book.img}`}
                            titulo={book.titulo}
                            avaliacao={book.avaliacao}
                        />
                    ))}
                </div>

                <IconButton onClick={() => scrollRight(destaquesRef)}>
                    <ChevronRightIcon />
                </IconButton>

            </div>

            <SectionHeader title="Avaliações e comentários" />

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

            </div>
    );
}

export default InformacaoLivro;