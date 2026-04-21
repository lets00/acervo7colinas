import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BookCard from "./BookCardAcervo.jsx";

import "../css/BookCarrossel.css";

import UmPerfeitoCavalheiro from "../../assets/UmPerfeitoCavalheiro.jpg";
import UmBeijo from "../../assets/UmBeijo.jpg";
import SociedadeVampiros from "../../assets/SociedadeVampiros.jpg";
import MaxtonHall from "../../assets/MaxtonHall.jpg";
import Vergonha from "../../assets/Vergonha.jpg";


const imageMap = {
    "UmPerfeitoCavalheiro": UmPerfeitoCavalheiro,
    "UmBeijo": UmBeijo,
    "SociedadeVampiros": SociedadeVampiros,
    "MaxtonHall": MaxtonHall,
    "Vergonha": Vergonha,
};

function BookCarrosselAcervo({ title, books }) {
    const containerRef = useRef(null);

    const scroll = (direction) => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;

        containerRef.current.scrollBy({
            left: direction === "left" ? -width * 0.8 : width * 0.8,
            behavior: "smooth"
        });
    };

 
    const getImageSrc = (imgName) => {
        if (!imgName) return null;
        return imageMap[imgName] || null;
    };

    return (
        <div className="carrossel-wrapper">
            
            {title && <h2 className="carrossel-title">{title}</h2>}

            <div className="carrossel-container">
                <IconButton onClick={() => scroll("left")}>
                    <ChevronLeftIcon />
                </IconButton>

                <div className="books-container" ref={containerRef}>
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            id={book.id}
                            imagem={getImageSrc(book.img)}
                            titulo={book.titulo}
                            autor={book.autor}
                            avaliacao={book.avaliacao}
                            totalAvaliacoes={book.totalAvaliacoes}
                            disponivel={book.disponivel}
                        />
                    ))}
                </div>

                <IconButton onClick={() => scroll("right")}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default BookCarrosselAcervo;