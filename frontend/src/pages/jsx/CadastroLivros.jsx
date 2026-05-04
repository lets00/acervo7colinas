import React, { useState } from "react";
import { 
  Box, Button, Grid, MenuItem, TextField, Typography, 
  FormControl, InputLabel, Select, OutlinedInput 
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import Header from "../../components/jsx/Header";
import '../css/CadastroLivros.css';
import BotaoLivroCadastrar from '../../components/jsx/BotaoLivroCadastrar.jsx';
import api from "../../services/apis";

dayjs.locale('pt-br');


function CadastroLivros() {
  const [formData, setFormData] = useState({
    titulo: "",
    isbn: "",
    ano: null,
    quantidadeExemplares: "",
    genero: "",
    autor: "",
    editora: "",
    descricao: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({ ...prev, ano: newValue }));
  };

  const cadastrolivro = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        quantidadeExemplares: Number(formData.quantidadeExemplares),
        ano: formData.ano && typeof formData.ano.year === 'function' 
             ? formData.ano.year() 
             : null,
      };

      await api.post("/livros", dataToSend);

      alert("Livro cadastrado com sucesso!");
      setFormData({
        titulo: "", isbn: "", ano: null, quantidadeExemplares: "",
        genero: "", autor: "", editora: "", descricao: "",
      });

    } catch (error) {
      console.error("Erro completo:", error);
      const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert(mensagem);
    }
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
                      <TextField required fullWidth label="Título" variant="outlined" sx={{ width: '468px' } }  name="titulo" value={formData.titulo} onChange={handleChange} />
                      <TextField required fullWidth label="ISBN" variant="outlined" sx={{ width: '468px' } }  name="isbn" value={formData.isbn} onChange={handleChange} />
                      
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DatePicker
                          label="Ano"
                          name="ano" value={formData.ano} onChange={handleDateChange}
                          views={['month', 'year']} 
                          format="MM/YYYY"
                          slotProps={{ textField: { fullWidth: true, required: true, sx: { width: '468px' } } }}
                        />
                      </LocalizationProvider>

                      <TextField required fullWidth label="Quantidade de exemplares" type="number" sx={{ width: '468px' } } name="quantidadeExemplares" value={formData.quantidadeExemplares} onChange={handleChange}/>

                      <FormControl required fullWidth sx={{ width: '468px' } } >
                        <InputLabel>Gênero</InputLabel>
                        <Select
                          name="genero" value={formData.genero} onChange={handleChange}
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
                    <TextField required fullWidth label="Autor" variant="outlined"  sx={{ width: '468px' } } name="autor" value={formData.autor} onChange={handleChange}/>
                    <TextField required fullWidth label="Editora" variant="outlined"  sx={{ width: '468px' } } name="editora" value={formData.editora} onChange={handleChange} />
                      
                    <TextField label="Descrição" multiline rows={8.5} fullWidth sx={{ width: '468px' } } variant="outlined" helperText="0/100" name="descricao" value={formData.descricao} onChange={handleChange}/>
                  </Box>
                 </Grid>
                </Grid>
  
                <BotaoLivroCadastrar/>

            </form>
        </Box>
    </Box>
  );
}

export default CadastroLivros;
