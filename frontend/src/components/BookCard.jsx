import "./BookCard.css";

function BookCard({ imagem, titulo, avaliacao }) {
    return (
        <div className="book-card">
            <img src={imagem} alt={titulo} className="book-image" />

            <p className="book-title">{titulo}</p>

            <div className="book-rating">
                <span className="star">⭐</span>
                <span>{avaliacao}</span>
            </div>
        </div>
    );
}

export default BookCard;