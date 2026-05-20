
import { Box, Button} from "@mui/material";
import "../css/BotaoCadastrarLivro.css";

function BotaoLivroCadastrar({ onCancel }){
    return (
        <>
            <Box className="botoes">
                <Button
                    type="submit" variant="contained" className="btn-cadastrar" >
                    CADASTRAR
                </Button>
                <Button 
                        variant="outlined" onClick={onCancel} className="btn-cancelar" >
                        CANCELAR
                </Button>
            </Box>
        </>
    )
}
export default BotaoLivroCadastrar;