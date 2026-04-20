import React, { useState } from "react";
import { 
  Box, Button, Grid, MenuItem, TextField, Typography, 
  FormControl, InputLabel, Select, OutlinedInput 
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import Header from "../../components/jsx/Header";
import '../css/CadastroLivros.css';
import BotaoLivroCadastrar from '../../components/jsx/BotaoLivroCadastrar.jsx';
import LivroCadastro from '../../assets/LivroCadastro.jpeg';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
dayjs.locale('pt-br');


function CadastroLivros() {
  
  const [generos, setGeneros] = useState("");
  const [preview, setPreview] = useState(LivroCadastro);

  const handleChange = (event) => {
    setGeneros(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      if (preview !== LivroCadastro) {
        URL.revokeObjectURL(preview);
      }
      setPreview(objectUrl);
    }
  };

  const cadastrolivro = (e) => {
    e.preventDefault();
    console.log("Cadastrou o livro com o gênero:", generos);
  };

  return (
    <Box className="container" >
        <Header />
        <Box className="content">
          
            <Typography variant="h4" align="center" className="titulo" sx={{ mt: 5 }}>
              Cadastro Dos Livros!
            </Typography>

            <Box className="barra" sx={{ mt: 5 }}>
              <Typography className="barra-texto">
                Cadastro Dos Livros:
              </Typography>
            </Box>

            <form onSubmit={cadastrolivro} >
                <Grid container spacing={6} justifyContent="center"   >
                  <Grid item xs={12} md={6} >
                    <Box className="coluna">
                      <TextField required fullWidth label="Título" variant="outlined" sx={{ width: '468px' } } />
                      <TextField required fullWidth label="ISBN" variant="outlined" sx={{ width: '468px' } } />
                      
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                          label="Ano"
                          views={['month', 'year']} 
                          format="MM/YYYY"
                          slotProps={{ textField: { fullWidth: true, required: true, sx: { width: '468px' } } }}
                        />
                      </LocalizationProvider>

                      <TextField required fullWidth label="Quantidade de exemplares" type="number" sx={{ width: '468px' } } />

                      <FormControl required fullWidth sx={{ width: '468px' } } >
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

                <Grid item xs={12} md={6} >
                  <Box className="coluna" >
                    <TextField required fullWidth label="Autor" variant="outlined"  sx={{ width: '468px' } }/>
                    <TextField required fullWidth label="Editora" variant="outlined"  sx={{ width: '468px' } } />
                      
                    <TextField label="Descrição" multiline rows={8.5} fullWidth sx={{ width: '468px' } } variant="outlined" helperText="0/100"/>
                  </Box>
                 </Grid>
                </Grid>
                <Box className="barra-imagem" sx={{ mt: 5 }}>
                  <Typography className="barra-texto" sx={{ml:60}}>
                    Selecione a foto do livro:
                  </Typography>
                </Box>
                <Grid container justifyContent="center" sx={{ mt: 7 }}>
                <Box className="box-imagem" sx={{ textAlign: 'center' }}>
                  <Typography className="texto-imagem">Selecionar Foto</Typography>
                  <Box 
                    component="img" 
                    src={preview} 
                    alt="Preview" 
                    className="img-preview" 
                    sx={{  objectFit: 'cover', display: 'block', mb: 2, mx: 'auto' }} 
                  />
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    disableElevation
                    className="botao-imagem"
                    startIcon={<CloudUploadIcon />}
                  >
                    SELECIONAR FOTO
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleFileChange}  
                      accept="image/*"
                    />
                  </Button>
                </Box>
              </Grid>
              <BotaoLivroCadastrar/>
            </form>
        </Box>
    </Box>
  );
}

export default CadastroLivros;
