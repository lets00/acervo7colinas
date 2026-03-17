import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import "./informacaoLivros.css";
import SectionHeader from "../components/SectionHeader";
import BookCard from "../components/BookCard";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Importações para o carrossel
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


function InformacaoLivro() {

    const { id } = useParams();
    const exemplares = [
        { id: 1, secao: "A1", disponibilidade: "Disponível" },
        { id: 2, secao: "B3", disponibilidade: "Emprestado" },
        { id: 3, secao: "C2", disponibilidade: "Disponível" }
    ];

    const [destaques, setDestaques] = useState([]);


    const destaquesRef = useRef(null);

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


    }, []);


    return (
        <>

            <div className="page-informacao-livro">
                <h1>Informações do Livro</h1>
                <p>ID do livro: {id}</p>

                <SectionHeader title="Exemplares" />

                <div className="exemplares-section">

                    <div className="exemplares-table">
                        <TableContainer>
                            <Table className="exemplares-table" size="medium">

                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>SEÇÃO</TableCell>
                                        <TableCell>DISPONIBILIDADE</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {exemplares.map((exemplar, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{exemplar.id}</TableCell>
                                            <TableCell>{exemplar.secao}</TableCell>
                                            <TableCell>{exemplar.disponibilidade}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>

                    </div>
                </div>
                <SectionHeader title="Os leitores também gostaram" />
                
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
                <SectionHeader title="Avaliações e comentários" />


            </div>
        </>
    );
}


export default InformacaoLivro;