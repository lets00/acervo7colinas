import "./BookCard.css";
import { Link } from "react-router-dom";


function BookCard({ id, imagem, titulo, avaliacao }) {
    return (
        <Link to={`/livro/${id}`} className="book-card-link">

            <div className="book-card">
                <img src={imagem} alt={titulo} className="book-image" />

                <p className="book-title">{titulo}</p>

                <div className="book-rating">
                    <span className="star">⭐</span>
                    <span>{avaliacao}</span>
                </div>
            </div>

        </Link>
    );
}

export default BookCard;