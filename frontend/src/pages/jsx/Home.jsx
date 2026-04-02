import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import "../css/Home.css";
import BookCard from "../../components/jsx/BookCard";
import SectionHeader from "../../components/jsx/SectionHeader";
import Header from "../../components/jsx/Header";
import debateImg from "../../assets/imagem_debate.png";


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

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Home() {
    const [destaques, setDestaques] = useState([]);
    const [novidades, setNovidades] = useState([]);
    const [agendas, setAgendas] = useState([]);

    const destaquesRef = useRef(null);
    const novidadesRef = useRef(null);
    const imagens = ["/imagem-carrossel-biblioteca.png", "/imagem-carrossel-dia-nacional-do-livro-infantil.png", "/imagem-carrossel-divertida.png"];
    function Carousel({ imagens }) {
        return (
            <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }} // 👈 ESSA LINHA FAZ AS BOLINHAS
            autoplay={{ delay: 5000 }}
            speed={1500}
            loop={true}
            >
            {imagens.map((img, index) => (
                <SwiperSlide key={index}>
                <img
                    src={img}
                    alt="slide"
                    style={{
                    width: "100%",
                    height: "clamp(180px, 40vw, 300px)",
                    objectFit: "cover",
                    borderRadius: "10px"
                    }}
                />
                </SwiperSlide>
            ))}
            </Swiper>
        );
    }

    const scroll = (ref, direction) => {
        if (!ref.current) return;

        const containerWidth = ref.current.clientWidth;

        ref.current.scrollBy({
            left: direction === "left" ? -containerWidth * 0.8 : containerWidth * 0.8,
            behavior: "smooth"
        });
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
                    px: { xs: "16px", md: "60px" }
                }}
            >
                
                <div className="carousel-wrapper">
                    <Carousel imagens={imagens} />
                </div>

                

                {/* DESTAQUES */}
                <SectionHeader title="Destaque" />

                <div className="carousel-container">
                    <IconButton onClick={() => scroll(destaquesRef, "left")}>
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

                    <IconButton onClick={() => scroll(destaquesRef, "right")}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>

                {/* NOVIDADES */}
                <SectionHeader title="Novidades" />

                <div className="carousel-container">
                    <IconButton onClick={() => scroll(novidadesRef, "left")}>
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

                    <IconButton onClick={() => scroll(novidadesRef, "right")}>
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
                        <TableContainer component={Box} sx={{ width: '100%', overflowX: 'auto' }}>
                            <Table stickyHeader aria-label="agenda table">
                                <TableHead>
                                    <TableRow>
                                        {/* Use sx para definir larguras mínimas, evitando que o texto esmague */}
                                        <TableCell sx={{ minWidth: 100 }}>Data</TableCell>
                                        <TableCell sx={{ minWidth: 80 }}>Hora</TableCell>
                                        <TableCell sx={{ minWidth: 150 }}>Tema</TableCell>
                                        <TableCell sx={{ minWidth: 150 }}>Obra / Autor</TableCell>
                                        <TableCell sx={{ minWidth: 120 }}>Celebrador(a)</TableCell>
                                        <TableCell sx={{ minWidth: 100 }}>Local</TableCell>
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