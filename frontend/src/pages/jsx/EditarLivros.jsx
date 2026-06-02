import React, { useState, useEffect } from "react";
import {
  Box,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Button,
  Divider,
  Grid,
  OutlinedInput,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Header from "../../components/jsx/Header.jsx";
import "../css/CadastroLivros.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const GENEROS = [
  { value: "Ficção", label: "Ficção" },
  { value: "Ficcao_Cientifica", label: "Ficção Científica" },
  { value: "Fantasia", label: "Fantasia" },
  { value: "Aventura", label: "Aventura" },
  { value: "Drama", label: "Drama" },
  { value: "Distopia", label: "Distopia" },
  { value: "Infantojuvenil", label: "Infantojuvenil" },
  { value: "HQ_Mangas", label: "HQs e Mangás" },
  { value: "Romance", label: "Romance" },
  { value: "Terror", label: "Terror" },
  { value: "Contos", label: "Contos" },
  { value: "Crônicas", label: "Crônicas" },
  { value: "Poesia", label: "Poesia" },
  { value: "Suspense", label: "Suspense" },
  { value: "Biografia", label: "Biografia" },
  { value: "Autoajuda", label: "Autoajuda" },
  { value: "Historia", label: "História" },
  { value: "Filosofia", label: "Filosofia" },
  { value: "Religiao", label: "Religião e Espiritualidade" },
  { value: "Negocios", label: "Negócios e Carreira" },
  { value: "Culinaria", label: "Culinária" },
  { value: "Saude", label: "Saúde e Bem-estar" },
  { value: "Tecnologia", label: "Tecnologia e Ciência" },
];

function EditarLivros() {
  const { id } = useParams();
  console.log("ID recebido:", id);
  const navigate = useNavigate();

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const buscarLivro = async () => {
      try {
        const response = await axios.get(`${API_URL}/livros/${id}`);
        const dadosDoLivro = response.data;

        setFormData({
          ...dadosDoLivro,
          ano: dadosDoLivro.ano ? dayjs(String(dadosDoLivro.ano), "YYYY") : null,

          genero: dadosDoLivro.genero ||
                  dadosDoLivro.generos?.[0] ||
                  "",

          quantidadeExemplares:
            dadosDoLivro.quantidadeExemplares ?? "",

          autor: dadosDoLivro.autor || "",
          editora: dadosDoLivro.editora || "",
          descricao: dadosDoLivro.descricao || "",
        });
      } catch (error) {
        console.error("Erro ao buscar o livro:", error);
        setSnackbar({ open: true, message: "Não foi possível carregar os dados do livro.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    buscarLivro();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (novaData) => {
    setFormData((prev) => ({ ...prev, ano: novaData }));
    if (errors.ano) {
      setErrors((prev) => ({ ...prev, ano: "" }));
    }
  };

  const validar = () => {
    const novosErros = {};
    if (!formData.titulo.trim()) novosErros.titulo = "Título é obrigatório.";
    if (!formData.isbn.trim()) novosErros.isbn = "ISBN é obrigatório.";
    if (!formData.ano || !dayjs(formData.ano).isValid()) novosErros.ano = "Ano é obrigatório.";
    if (formData.quantidadeExemplares === "" || formData.quantidadeExemplares < 0)
      novosErros.quantidadeExemplares = "Quantidade inválida.";
    if (!formData.genero) novosErros.genero = "Gênero é obrigatório.";
    if (!formData.autor.trim()) novosErros.autor = "Autor é obrigatório.";
    if (!formData.editora.trim()) novosErros.editora = "Editora é obrigatória.";
    return novosErros;
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErrors(novosErros);
      return;
    }

    setSaving(true);
    try {
      const dadosParaEnviar = {
        ...formData,
        ano: formData.ano ? Number(formData.ano.format("YYYY")) : null,
        quantidadeExemplares: Number(formData.quantidadeExemplares),
      };

      await axios.put(`${API_URL}/livros/${id}`, dadosParaEnviar);
      setSnackbar({ open: true, message: "Livro atualizado com sucesso!", severity: "success" });
      setTimeout(() => navigate("/livros"), 1500);
    } catch (error) {
      console.error("Erro ao atualizar o livro:", error);
      setSnackbar({ open: true, message: "Erro ao salvar as alterações.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress sx={{ color: "#37228B" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#fff",
        mt: "-55px",
        width: "100%",
      }}
    >
      <Header />

      <Typography
        variant="h4"
        className="livrossalvos-titulo"
        sx={{ mt: 4, ml: -85, fontWeight: 700, color: "#37228B" }}
      >
        Editar Livro
      </Typography>

      <Box sx={{ width: "100%", maxWidth: "1000px", mt: 2, px: 3 }}>
        <Divider sx={{ borderColor: "#F5A623", borderBottomWidth: 2, mb: 4 }} />

        <Box
          component="form"
          onSubmit={handleSalvar}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Grid container spacing={4} justifyContent="center">

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Título"
                  variant="outlined"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  error={!!errors.titulo}
                  helperText={errors.titulo}
                  sx={{width: "468px"}}
                />

                <TextField
                  required
                  fullWidth
                  sx={{mt:2.5}}
                  label="ISBN"
                  variant="outlined"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  error={!!errors.isbn}
                  helperText={errors.isbn}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                  <DatePicker
                    label="Ano"
                    value={formData.ano}
                    onChange={handleDateChange}
                    views={["year"]}
                    format="YYYY"
                    sx={{mt:2.5}}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        error: !!errors.ano,
                        helperText: errors.ano,
                      },
                    }}
                  />
                </LocalizationProvider>

                <FormControl required fullWidth error={!!errors.genero}>
                  <InputLabel>Gênero</InputLabel>
                  <Select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    input={<OutlinedInput label="Gênero" />}
                    sx={{mt:2.5}}
                  >
                    {GENEROS.map((g) => (
                      <MenuItem key={g.value} value={g.value}>
                        {g.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.genero && (
                    <Typography variant="caption" color="error" sx={{ mt: 2, ml: 1.5 }}>
                      {errors.genero}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Autor"
                  variant="outlined"
                  name="autor"
                  value={formData.autor}
                  onChange={handleChange}
                  error={!!errors.autor}
                  helperText={errors.autor}
                  sx={{width: "468px"}}
                />

                <TextField
                  required
                  fullWidth
                  label="Editora"
                  variant="outlined"
                  name="editora"
                  value={formData.editora}
                  onChange={handleChange}
                  error={!!errors.editora}
                  helperText={errors.editora}
                />

                <TextField
                  label="Descrição"
                  multiline
                  rows={7}
                  fullWidth
                  variant="outlined"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            <TextField
                  required
                  fullWidth
                  label="Quantidade em Estoque"
                  type="number"
                  name="quantidadeExemplares"
                  inputProps={{ min: 0 }}
                  value={formData.quantidadeExemplares}
                  onChange={handleChange}
                  error={!!errors.quantidadeExemplares}
                  helperText={errors.quantidadeExemplares}
                />
          </Grid>


          <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => navigate("/livros")}
              disabled={saving}
              sx={{
                width: "300px",
                borderColor: "#37228B",
                color: "#37228B",
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                py: 1.2,
                "&:hover": { borderColor: "#2a1870", bgcolor: "rgba(55,34,139,0.05)" },
              }}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              sx={{
                width: "300px",
                bgcolor: "#37228B",
                borderRadius: "8px",
                fontWeight: 600,
                textTransform: "none",
                py: 1.2,
                "&:hover": { bgcolor: "#2a1870" },
              }}
            >
              {saving ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Salvar Alterações"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default EditarLivros;