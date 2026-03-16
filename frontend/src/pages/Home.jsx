import { useEffect, useState } from "react";
import "./Home.css";
import BookCard from "../components/BookCard";
import SectionHeader from "../components/SectionHeader";
import debateImg from "../assets/image_52.png";
import bibliotecaImg from "../assets/imagem_biblioteca.png";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";


function Home() {

    const [destaques, setDestaques] = useState([]);
    const [novidades, setNovidades] = useState([]);
    const [agendas, setAgendas] = useState([]);

    const destaquesRef = useRef(null);
    const novidadesRef = useRef(null);

    const scrollLeft = (ref) => {
        ref.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = (ref) => {
        ref.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    useEffect(() => {

        fetch("http://localhost:3000/destaques")
            .then(res => res.json())
            .then(data => setDestaques(data));

        fetch("http://localhost:3000/novidades")
            .then(res => res.json())
            .then(data => setNovidades(data));

        fetch("http://localhost:3000/agendas")
            .then(res => res.json())
            .then(data => setAgendas(data));

    }, []);

    return (
        <>
            <div className="page-home"> 
                    <div className="imagem-biblioteca">
                    <img src={bibliotecaImg} alt="Biblioteca" />
                </div>

                <SectionHeader title="Destaque" />
                <div className="carousel-container">

                    <IconButton onClick={() => scrollLeft(destaquesRef)}>
                        <ChevronLeftIcon />
                    </IconButton>

                    <div className="books-container" ref={destaquesRef}>
                        {destaques.map((book, index) => (
                            <BookCard
                                key={index}
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


                <SectionHeader title="Novidades" />
                <div className="carousel-container">

                    <IconButton onClick={() => scrollLeft(novidadesRef)}>
                        <ChevronLeftIcon />
                    </IconButton>

                    <div className="books-container" ref={novidadesRef}>
                        {novidades.map((book, index) => (
                            <BookCard
                                key={index}
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
                            <Table className="agenda-table" size="medium">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>Data</TableCell>
                                        <TableCell>Hora</TableCell>
                                        <TableCell>Tema a ser debatido</TableCell>
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

            </div>

        </>
    );
}

export default Home;
