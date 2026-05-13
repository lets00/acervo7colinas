import React, { useState } from "react";
import { Box, Grid, MenuItem, TextField, Typography, 
  FormControl, InputLabel, Select, OutlinedInput, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import Header from "../../components/jsx/Header";
import '../css/CadastroLivros.css';
import BotaoLivroCadastrar from '../../components/jsx/BotaoLivroCadastrar.jsx';
import api from "../../services/apis";
import CampoCadastrosLivros from "../../components/jsx/CampoCadastrosLivros.jsx";

dayjs.locale('pt-br');


const DESCRICAO_MAX = 100;

function CadastroLivros() {
  const [imagemLivro, setImagemLivro] = useState(null);
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
    if (name === 'quantidadeExemplares' && value !== "" && Number(value) < 0) return;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleDateChange = (newValue) => {
    setFormData(prev => ({ ...prev, ano: newValue }));
    setErrors(prev => ({ ...prev, ano: false }));
  };

  const validar = () => {
    const novoErros = {};
    if (!formData.titulo.trim()) novoErros.titulo = true;
    if (!formData.isbn.trim()) novoErros.isbn = true;
    if (!formData.ano) novoErros.ano = true;
    if (!formData.quantidadeExemplares || Number(formData.quantidadeExemplares) < 1) novoErros.quantidadeExemplares = true;
    if (!formData.genero) novoErros.genero = true;
    if (!formData.autor.trim()) novoErros.autor = true;
    if (!formData.editora.trim()) novoErros.editora = true;
    if (!imagemLivro) novoErros.imagem = true;

    setErrors(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  const handleCancel = () => {
    setFormData({ 
      titulo: "", isbn: "", ano: null, quantidadeExemplares: "", 
      genero: "", autor: "", editora: "", descricao: "" 
    });
    setImagemLivro(null);
    setErrors({});
  };

  const cadastrolivro = async (e) => {
    e.preventDefault();
    
    if (!validar()) {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      return;
    }

    const dataToSend = new FormData();
    dataToSend.append("titulo", formData.titulo);
    dataToSend.append("isbn", formData.isbn);
    dataToSend.append("ano", formData.ano ? formData.ano.year() : "");
    dataToSend.append("quantidadeExemplares", formData.quantidadeExemplares);
    dataToSend.append("genero", formData.genero);
    dataToSend.append("autor", formData.autor);
    dataToSend.append("editora", formData.editora);
    dataToSend.append("descricao", formData.descricao);
    
    if (imagemLivro) {
      dataToSend.append("img", imagemLivro); 
    }

    try {
      const response = await api.post("/livros", dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 201 || response.status === 200) {
        alert("Livro cadastrado com sucesso!");
        handleCancel();
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      const mensagemErro = error.response?.data?.message || "Erro ao conectar com o servidor.";
      alert(`Erro: ${mensagemErro}`);
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
                      <TextField required fullWidth label="Título" error={!!errors.titulo} helperText={errors.titulo && "Título é obrigatório"} variant="outlined" sx={{ width: '468px' } }  name="titulo" value={formData.titulo} onChange={handleChange} />
                      <TextField required fullWidth label="ISBN" error={!!errors.isbn} helperText={errors.isbn && "ISBN é obrigatório"} variant="outlined" sx={{ width: '468px' } }  name="isbn" value={formData.isbn} onChange={handleChange} />
                      
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                          <DatePicker
                            label="Ano"
                            value={formData.ano}
                            onChange={handleDateChange}
                            views={['year']}
                            format="YYYY"
                            slotProps={{ 
                              textField: { 
                                fullWidth: true, 
                                required: true, 
                                error: !!errors.ano,
                                helperText: errors.ano && "Selecione o ano",
                                sx: { width: '468px' } 
                              } 
                            }}
                          />
                      </LocalizationProvider>

                      <TextField required fullWidth label="Quantidade de exemplares" error={!!errors.quantidadeExemplares} helperText={errors.quantidadeExemplares && "Quantidade de exemplares é obrigatória"}  type="number" sx={{ width: '468px' } } name="quantidadeExemplares" value={formData.quantidadeExemplares} onChange={handleChange}/>

                      <FormControl required fullWidth sx={{ width: '468px' } } error={!!errors.genero} >
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
                          <MenuItem value="Autorajuda">Autoajuda</MenuItem>
                          <MenuItem value="Historia">História</MenuItem>
                          <MenuItem value="Filosofia">Filosofia</MenuItem>
                          <MenuItem value="Religiao">Religião e Espiritualidade</MenuItem>
                          <MenuItem value="Negocios">Negócios e Carreira</MenuItem>
                          <MenuItem value="Culinaria">Culinária</MenuItem>
                          <MenuItem value="Saude">Saúde e Bem-estar</MenuItem>
                          <MenuItem value="Tecnologia">Tecnologia e Ciência</MenuItem>
                        </Select>
                        {errors.genero && <FormHelperText>Gênero é obrigatório</FormHelperText>}
                      </FormControl>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} >
                  <Box className="coluna" >
                    <TextField required fullWidth label="Autor" variant="outlined"  error={!!errors.autor} helperText={errors.autor && "Autor é obrigatório"}  sx={{ width: '468px' } } name="autor" value={formData.autor} onChange={handleChange}/>
                    <TextField required fullWidth label="Editora" variant="outlined"  error={!!errors.editora} helperText={errors.editora && "Editora é obrigatória"}  sx={{ width: '468px' } } name="editora" value={formData.editora} onChange={handleChange} />
                      
                    <TextField label="Descrição" multiline rows={8.5} fullWidth sx={{ width: '468px' } }  error={!!errors.descricao} helperText={errors.descricao ? "Descrição é obrigatória" : descricaoHelper} variant="outlined" name="descricao" value={formData.descricao} onChange={handleChange}/>
                  </Box>
                 </Grid>
              </Grid> 
              <CampoCadastrosLivros onChange={(file) => setImagemLivro(file)} error={!!errors.imagem} helperText={errors.imagem && "Selecione a foto do livro"} />
                
              <BotaoLivroCadastrar onCancel={handleCancel} />

            </form>
        </Box>
    </Box>
  );
}

export default CadastroLivros;
