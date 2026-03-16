import { useParams } from "react-router-dom";

function InformacaoLivro() {

    const { id } = useParams();

    return (
        <div>
            <h1>Informações do Livro</h1>
            <p>ID do livro: {id}</p>
        </div>
    );
}

export default InformacaoLivro;