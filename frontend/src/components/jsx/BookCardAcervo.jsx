import "../css/BookCard.css";
import { Link } from "react-router-dom";
import "../css/BookCardAcervo.css";

function BookCardAcervo({ id, imagem, titulo, autor, avaliacao, totalAvaliacoes, disponivel }) {
    return (
        <Link to={`/livro/${id}`} className="book-card-link">
            <div className="book-card">
                <img src={imagem} alt={titulo} className="book-image" />

                <p className="book-title">{titulo}</p>
                <p className="book-author">{autor}</p>

                <div className="bookinfo">
                    <span className={`book-status ${disponivel ? "disponivel" : "indisponivel"}`}>
                        {disponivel ? "Disponível" : "Indisponível"}
                    </span>

                    <div className="book-rating">
                        <span className="star">⭐</span>
                        <span>{avaliacao} ({totalAvaliacoes})</span>
                    </div>
                </div>

                <button className="btn-detalhes">Detalhes</button>
            </div>
        </Link>
    );
}

export default BookCardAcervo;