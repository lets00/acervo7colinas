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


const DESCRICAO_MAX = 100;

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
 
  const [errors, setErrors] = useState({});
 
  const handleChange = (event) => {
    const { name, value } = event.target;
 
    if (name === 'descricao' && value.length > DESCRICAO_MAX) return;
 
    if (name === 'quantidadeExemplares' && Number(value) < 0) return;
 
    setFormData(prev => ({ ...prev, [name]: value }));

    setErrors(prev => ({ ...prev, [name]: false }));
  };
 
  const handleDateChange = (newValue) => {
    setFormData(prev => ({ ...prev, ano: newValue }));
    setErrors(prev => ({ ...prev, ano: false }));
  };
 

  const validar = () => {
    const novosErros = {};
    if (!formData.titulo.trim()) novosErros.titulo = true;
    if (!formData.isbn.trim()) novosErros.isbn = true;
    if (!formData.ano) novosErros.ano = true;
    if (!formData.quantidadeExemplares || Number(formData.quantidadeExemplares) <= 0)
      novosErros.quantidadeExemplares = true;
    if (!formData.genero) novosErros.genero = true;
    if (!formData.autor.trim()) novosErros.autor = true;
    if (!formData.editora.trim()) novosErros.editora = true;
    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };
 
  const cadastrolivro = async (e) => {
    e.preventDefault();
 
    if (!validar()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
 
    try {
      const dataToSend = {
        ...formData,
        quantidadeExemplares: Number(formData.quantidadeExemplares),
        ano: formData.ano.year(),
      };
 
      console.log("Enviando para o backend:", dataToSend);
 
      const response = await api.post("/livros", dataToSend);
 
      if (response.status === 201 || response.status === 200) {
        alert("Livro cadastrado com sucesso!");
        setFormData({
          titulo: "", isbn: "", ano: null, quantidadeExemplares: "",
          genero: "", autor: "", editora: "", descricao: "",
        });
        setErrors({});
      }
 
    } catch (error) {
      console.error("Erro na requisição:", error);
      const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert(`Erro: ${mensagem}`);
    }
  };
 
  const descricaoHelper = `${formData.descricao.length}/${DESCRICAO_MAX}`;

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
                      
                    <TextField label="Descrição" multiline rows={8.5} fullWidth sx={{ width: '468px' } } variant="outlined" helperText={descricaoHelper} name="descricao" value={formData.descricao} onChange={handleChange}/>
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
