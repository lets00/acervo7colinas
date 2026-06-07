import React, { useState } from "react";
import {
  Box, Checkbox, Typography, TextField, InputAdornment,
  FormControl, InputLabel, OutlinedInput, IconButton,
  FormControlLabel, Button, Grid, Alert, CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../css/Login.css";
import Header from "../../components/jsx/HeaderLogin";
import StackBooks from "../../assets/StackBooks.png";
import PinkBook from "../../assets/PinkBook.png";
import Books from "../../assets/Books.png";
import OpenOrangeBook from "../../assets/OpenOrangeBook.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUsuario } from "../../utils/auth";

const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

const theme = createTheme({
  palette: {
    primary: { main: "#CCD3F8" },
    background: { default: "#CCD3F8" },
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((s) => !s);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data.token);
        saveUsuario(data.usuario);
        navigate('/');
      } else {
        setErro(data.mensagem || 'Login ou senha incorreto');
      }
    } catch (err) {
      setErro('Erro da conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ bgcolor: "background.default", position: "relative", overflow: "visible" }}
        className="container"
      >
        <Box className="header" sx={{ ml: -60 }}>
          <Header />
        </Box>

        <Box component="img" src={StackBooks} alt="StackBooks" className="img-livros" />
        <Box component="img" src={PinkBook} alt="PinkBook" className="img-livros-Dois" />
        <Box component="img" src={OpenOrangeBook} alt="OpenOrangeBook" className="img-livros-Tres" />
        <Box component="img" src={Books} alt="Books" className="img-livros-Quatro" />

        <Box className="center-content">
          <Box className="glass" sx={{ width: 850, minHeight: 400, mt: -90 }}>

            <Typography variant="h4" align="center" className="titulo" sx={{ mt: 5 }}>
              Bem Vindo!
            </Typography>

            {erro && (
              <Alert severity="error" sx={{ mt: 3, maxWidth: "750px", mx: "auto" }}>
                {erro}
              </Alert>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                required
                fullWidth
                label="Email"
                autoComplete="username"
                variant="outlined"
                size="small"
                sx={{ maxWidth: "750px", mx: "auto", mt: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl sx={{ mt: 4, width: "750px" }} variant="outlined">
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  autoComplete="current-password"
                  onChange={(e) => setSenha(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"
                  sx={{ height: "45px" }}
                />
              </FormControl>

              <Box>
                <Typography
                  variant="body2"
                  component="a"
                  href="/esqueci-senha"
                  sx={{ ml: 75, color: "#000" }}
                >
                  Esqueceu a senha?
                </Typography>
              </Box>
              <Box className="botoes" sx={{ mt: 3 }}>
                <Button type="submit" className="btn-cadastrar" sx={{ color: "#ffff", width: "750px" }} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : "Entrar"}
                </Button>
              </Box>

              <Grid className="linha-login">
                <Typography className="texto-cadastro" sx={{ color: "#242424", mt: 4 }}>
                  Já Tem Cadastro?
                </Typography>
              </Grid>
              <Grid>
                <Typography className="texto-login" sx={{ color: "#312783", mt: 1 }}>
                  Crie conta
                </Typography>
              </Grid>

              <Box className="icones">
                <Button variant="outlined" className="btn-iconUM"
                  sx={{ mt: 2, border: "none", boxShadow: "none", backgroundColor: "transparent" }}>
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="30" alt="Google" />
                </Button>
                <Button variant="outlined" className="btn-iconDOIS"
                  sx={{ mt: 2, border: "none", boxShadow: "none", backgroundColor: "transparent" }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" width="30" alt="Facebook" />
                </Button>
              </Box>
            </form>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}