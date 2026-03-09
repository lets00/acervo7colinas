import { useEffect, useState } from "react";
import "./Home.css";
import BookCard from "../components/BookCard";
import SectionHeader from "../components/SectionHeader";

function Home() {

    const [destaques, setDestaques] = useState([]);
    const [novidades, setNovidades] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/destaques")
            .then(res => res.json())
            .then(data => setDestaques(data));

        fetch("http://localhost:3000/novidades")
            .then(res => res.json())
            .then(data => setNovidades(data));
    }, []);

    return (
        <>
            <SectionHeader title="Destaque" />
            <div className="books-container">

                {destaques.map((book, index) => (
                    <BookCard
                        key={index}
                        imagem={`http://localhost:3000${book.img}`}
                        titulo={book.titulo}
                        avaliacao={book.avaliacao}
                    />
                ))}
            </div>
            <SectionHeader title="Novidades" />
            <div className="books-container">

                {novidades.map((book, index) => (
                    <BookCard
                        key={index}
                        imagem={`http://localhost:3000${book.img}`}
                        titulo={book.titulo}
                        avaliacao={book.avaliacao}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;