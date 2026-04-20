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
                    backgroundColor: "#37228B",
                    fontWeight: 700, 
                    fontFamily: "'Roboto', sans-serif",
                    width: "130px",
                    '&:hover': { 
                        backgroundColor: "#2a1870" 
                    } 
                }} 
            >
                Buscar 
            </Button>

            <Button variant="outlined" sx={{color: "#37228B",border: "1px solid #37228B",padding: "10px 40px",
                fontWeight: 700, fontFamily: "'Roboto', sans-serif", width: "130px", "&:hover": {border: "1px solid #2a1870",
                    backgroundColor: "rgba(55,34,139,0.04)", }
                }}>
                CANCELAR 
            </Button> 
        </Box> 
    );
} 

export default BotaoCadastrar;