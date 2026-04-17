import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import "../css/Home.css";
import BookCarrossel from "../../components/jsx/BookCarrossel";
import SectionHeader from "../../components/jsx/SectionHeader";
import Header from "../../components/jsx/Header";
import debateImg from "../../assets/imagem_debate.png";
import Footer from "../../components/jsx/Footer";

// Tabela
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
            pagination={{ clickable: true }} 
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
                <BookCarrossel books={destaques} />

                {/* NOVIDADES */}
                <SectionHeader title="Novidades" />
                <BookCarrossel books={novidades} ref={novidadesRef} />
                
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
                <div className="container-footer"><Footer /> </div>
            </Box>
        </Box>
    );
}

export default Home;