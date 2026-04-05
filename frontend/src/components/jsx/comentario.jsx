import { Avatar, Rating } from "@mui/material";
import "../css/comentario.css";

function Comentario({ usuario, comentario, nota, tempo }) {
    return (
        <div className="comentario-card">

            <div className="comentario-header" >

                <Avatar className="comentario-avatar">
                    {usuario?.[0]}
                </Avatar>

                <div className="comentario-conteudo">

                    <div className="comentario-top">
                        <Rating value={nota} readOnly />
                    </div>

                    <span className="comentario-usuario">
                        {usuario} • {tempo}
                    </span>

                    <p className="comentario-texto">
                        {comentario}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Comentario;