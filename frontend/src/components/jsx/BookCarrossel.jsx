import { useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BookCard from "./BookCard";

import "../css/BookCarrossel.css";

function BookCarrossel({ title, books }) {
    const containerRef = useRef(null);

    const scroll = (direction) => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;

        containerRef.current.scrollBy({
            left: direction === "left" ? -width * 0.8 : width * 0.8,
            behavior: "smooth"
        });
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
                            imagem={`http://localhost:3000${book.img}`}
                            titulo={book.titulo}
                            avaliacao={book.avaliacao}
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

export default BookCarrossel;