import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import "../css/Home.css";
import BookCard from "../../components/BookCard";
import SectionHeader from "../../components/SectionHeader";
import Header from "../../components/Header";
import debateImg from "../../assets/imagem_debate.png";
import bibliotecaImg from "../../assets/imagem_biblioteca.png";

// Tabela
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Carrossel
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Home() {
    const [destaques, setDestaques] = useState([]);
    const [novidades, setNovidades] = useState([]);
    const [agendas, setAgendas] = useState([]);

    const destaquesRef = useRef(null);
    const novidadesRef = useRef(null);

    const scrollLeft = (ref) => {
        ref.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = (ref) => {
        ref.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    useEffect(() => {
        fetch("http://localhost:3000/destaques")
            .then(res => res.json())
            .then(setDestaques);

        fetch("http://localhost:3000/novidades")
            .then(res => res.json())
            .then(setNovidades);

        fetch("http://localhost:3000/agendas")
            .then(res => res.json())
            .then(setAgendas);
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "100vh",
                bgcolor: "#fff",
                mt: "-55px"
            }}
        >
            <Header />

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "1440px",
                    px: "60px" // 🔥 substitui marginLeft/right
                }}
            >
                {/* imagem topo */}
                <div className="imagem-biblioteca">
                    <img src={bibliotecaImg} alt="Biblioteca" />
                </div>

                {/* DESTAQUES */}
                <SectionHeader title="Destaque" />

                <div className="carousel-container">
                    <IconButton onClick={() => scrollLeft(destaquesRef)}>
                        <ChevronLeftIcon />
                    </IconButton>

                    <div className="books-container" ref={destaquesRef}>
                        {destaques.map((book) => (
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

                {/* NOVIDADES */}
                <SectionHeader title="Novidades" />

                <div className="carousel-container">
                    <IconButton onClick={() => scrollLeft(novidadesRef)}>
                        <ChevronLeftIcon />
                    </IconButton>

                    <div className="books-container" ref={novidadesRef}>
                        {novidades.map((book) => (
                            <BookCard
                                key={book.id}
                                imagem={`http://localhost:3000${book.img}`}
                                titulo={book.titulo}
                                avaliacao={book.avaliacao}
                            />
                        ))}
                    </div>

                    <IconButton onClick={() => scrollRight(novidadesRef)}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>

                {/* AGENDA */}
                <SectionHeader title="Agenda de Encontros: Espaço de Debates" />

                <div className="agenda-banner">
                    <p className="agenda-texto">
                        Não precisa de inscrição! Basta chegar, ocupar seu lugar à mesa e compartilhar suas ideias.
                        Nossa biblioteca é o seu espaço de fala.
                    </p>
                </div>

                <div className="agenda-section">
                    <div className="agenda-table">
                        <TableContainer>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Hora</TableCell>
                                        <TableCell>Tema</TableCell>
                                        <TableCell>Obra / Autor</TableCell>
                                        <TableCell>Celebrador(a)</TableCell>
                                        <TableCell>Local</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {agendas.map((agenda, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{agenda.data}</TableCell>
                                            <TableCell>{agenda.hora}</TableCell>
                                            <TableCell>{agenda.tema}</TableCell>
                                            <TableCell>{agenda.obra}</TableCell>
                                            <TableCell>{agenda.celebrador}</TableCell>
                                            <TableCell>{agenda.local}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="agenda-image">
                        <img src={debateImg} alt="Debate" />
                    </div>
                </div>
            </Box>
        </Box>
    );
}

export default Home;