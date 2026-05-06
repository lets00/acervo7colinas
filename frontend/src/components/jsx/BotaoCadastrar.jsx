import { Box, Button, Grid, Typography } from "@mui/material"; 
function BotaoCadastrar(){ 
    return (
         <> 
            <Box className="botoes" sx={{mt:6}}> 
                <Button type="submit" className="btn-cadastrar" sx={{color:"#ffff"}} >
                     CADASTRAR 
                </Button>
                <Button variant="outlined" className="btn-cancelar" >
                     CANCELAR 
                </Button> 
            </Box> 
                <Grid className="linha-login">  
                    <Typography className="texto-cadastro" sx={{color:"#242424", mt:4}} > 
                        Já Tem Cadastro? 
                    </Typography> 
                </Grid> 
                <Grid> 
                    <Typography  className="texto-login" sx={{color:"#312783", mt:1}} >
                         Faça Login 
                    </Typography> 
                </Grid> 
                <Box className="icones"> 
                <Button variant="outlined" className="btn-iconUM" sx={{mt:2, border:"none", boxShadow: "none", backgroundColor:"transparent"}}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="30" alt="Google" /> 
                    </Button> 
                    <Button variant="outlined" className="btn-iconDOIS" sx={{mt:2, border:"none", boxShadow: "none", backgroundColor:"transparent"}}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" width="30" alt="Facebook" /> 
                    </Button> 
                </Box> 
        </> 
    )
} 
export default BotaoCadastrar;