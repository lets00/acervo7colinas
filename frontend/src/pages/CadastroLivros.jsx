import React from "react";
import { 
  Box, Button, Grid, MenuItem, TextField, Typography, 
  FormControl, InputLabel, Select, OutlinedInput 
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Header from "../components/Header";

function CadastroLivros() {
  const [generos, setGeneros] = React.useState("");

  const handleChange = (event) => {
    setGeneros(event.target.value);
  };

  const cadastrolivro = (e) => {
    e.preventDefault();
    console.log("Cadastrou o livro");
  };

  return (
    <div>
      <Box sx={{ display: "flex",flexDirection: "column", alignItems:"center", minHeight: "100vh", bgcolor: "#fff", marginTop:"-55px"  }}>
        <Header />
        <Box sx={{width: "1000%", maxWidth: "1250px"}}>
          
            <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "300", color: "#333", marginTop: "22px" }}>
              Cadastro Dos Livros!
            </Typography>

            <Box sx={{backgroundColor: "#CCD3F8",display: "flex", justifyContent: "flex-start", alignItems: "center", 
              width: "auto",width: "100%", py: "10px", px: "40px", mb: 4, boxSizing: "border-box"
              }} >
              <Typography sx={{ color: "#333", fontWeight: "300", fontSize: "1.1rem" }}>
                Cadastro Dos Livros:
              </Typography>
            </Box>

            <form onSubmit={cadastrolivro}>
              <Grid container spacing={4} justifyContent="center" >
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 4}}>
                    <TextField required fullWidth label="Título" variant="outlined" size="small"  sx={{ width: '458px' }}/>
                    <TextField required fullWidth label="ISBN" variant="outlined" size="small" sx={{ width: '458px' }} />
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Ano"
                        views={['year', 'month']}
                        format="MM/YYYY"
                        slotProps={{ textField: { fullWidth: true, required: true, size: "small"  } }}
                      />
                    </LocalizationProvider>

                    <TextField required fullWidth label="Quantidade de exemplares" type="number" size="small" />

                    <FormControl required fullWidth size="small">
                      <InputLabel>Gênero</InputLabel>
                      <Select
                        value={generos}
                        onChange={handleChange}
                        input={<OutlinedInput label="Gênero" />}
                        displayEmpty
                      >
                        <MenuItem value="Ficção">Ficção</MenuItem>
                        <MenuItem value="Ficcao_Cientifica">Ficção Científica</MenuItem>
                        <MenuItem value="Fantasia">Fantasia</MenuItem>
                        <MenuItem value="Aventura">Aventura</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                        <MenuItem value="Distopia">Distopia</MenuItem>
                        <MenuItem value="Infantojuvenil">Infantojuvenil</MenuItem>
                        <MenuItem value="HQ_Mangas">HQs e Mangás</MenuItem>
                        <MenuItem value="Romance">Romance</MenuItem>
                        <MenuItem value="Terror">Terror</MenuItem>
                        <MenuItem value="Contos">Contos</MenuItem>
                        <MenuItem value="Crônicas">Crônicas</MenuItem>
                        <MenuItem value="Poesia">Poesia</MenuItem>
                        <MenuItem value="Suspense">Suspense</MenuItem>
                        <MenuItem value="Biografia">Biografia</MenuItem>
                        <MenuItem value="Autorajuda">Autorajuda</MenuItem>
                        <MenuItem value="Historia">História</MenuItem>
                        <MenuItem value="Filosofia">Filosofia</MenuItem>
                        <MenuItem value="Religiao">Religião e Espiritualidade</MenuItem>
                        <MenuItem value="Negocios">Negócios e Carreira</MenuItem>
                        <MenuItem value="Culinaria">Culinária</MenuItem>
                        <MenuItem value="Saude">Saúde e Bem-estar</MenuItem>
                        <MenuItem value="Tecnologia">Tecnologia e Ciência</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField required fullWidth label="Autor" variant="outlined" size="small" sx={{ width: '458px' }}/>
                    <TextField required fullWidth label="Editora" variant="outlined" size="small" sx={{ width: '458px' }} />
                    
                    <TextField label="Descrição" multiline rows={7.5} fullWidth variant="outlined" helperText="0/100"/>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 5, display: "flex", gap: 2, justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#283593", px: 5, py: 1, fontWeight: "bold",minWidth: "100px" 
                  }}>
                  CADASTRAR
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ color: "#283593", borderColor: "#283593", px: 5,py: 1,fontWeight: "bold", minWidth: "150px"
                  }}>
                  CANCELAR
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
    </div>
  );
}

export default CadastroLivros;
