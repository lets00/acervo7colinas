import { Box, Button } from "@mui/material"; 

function BotaoCadastrar(){ 
    return (
        <Box 
            className="botoes" 
            sx={{ 
                mt: 4, 
                display: 'flex', 
                gap: 2,
                ml: 107
            }}
        > 
            <Button 
                variant="contained" 
                sx={{
                    color: "#fff",  
                    backgroundColor: "#283593",
                    fontWeight: "bold", 
                    width: "130px",
                    '&:hover': { 
                        backgroundColor: "#1a237e" 
                    } 
                }} 
            >
                Buscar 
            </Button>

            <Button variant="outlined" sx={{color: "#283593",border: "1px solid #283593",padding: "10px 40px",
                fontWeight: "bold",width: "130px", "&:hover": {border: "1px solid #1a237e",
                    backgroundColor: "rgba(40, 53, 147, 0.04)", }
                }}>
                CANCELAR 
            </Button> 
        </Box> 
    );
} 

export default BotaoCadastrar;