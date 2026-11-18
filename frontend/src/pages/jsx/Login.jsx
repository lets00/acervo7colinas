import React, { useState } from "react";
import {
  Box, Typography, TextField, InputAdornment,
  FormControl, InputLabel, OutlinedInput, IconButton,
  Button, Grid, Alert, CircularProgress, FormControlLabel,
  Radio, RadioGroup, FormLabel
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../css/Login.css";

import HeaderLogin from "../../components/jsx/HeaderLogin";
import StackBooks     from "../../assets/StackBooks.png";
import PinkBook       from "../../assets/PinkBook.png";
import Books          from "../../assets/Books.png";

import OpenOrangeBook from "../../assets/OpenOrangeBook.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { saveToken, saveUsuario } from "../../utils/auth";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme({
  palette: {
    primary: { main: "#CCD3F8" },
    background: { default: "#CCD3F8" },
  },
});

export default function Login() {
  const [email, setEmail]               = useState('');
  const [senha, setSenha]               = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const [tipoAcesso, setTipoAcesso] = useState('');

  const [anchorCriarConta, setAnchorCriarConta] = useState(null);

  const abrirMenuCriarConta = (event) => {
    setAnchorCriarConta(event.currentTarget);
  };

  const fecharMenuCriarConta = () => {
    setAnchorCriarConta(null);
  };

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

      let data;
      try {
        data = await response.json();
      } catch {
        setErro('O servidor retornou uma resposta inválida.');
        return;
      }

      if (!response.ok) {
        setErro(data.mensagem || 'Email ou senha incorretos.');
        return;
      }

      const tipo = data.tipo || data.usuario?.tipo;
      if (!data.token || !data.usuario || !tipo) {
        setErro('Não foi possível concluir o login: resposta inválida do servidor.');
        return;
      }

      saveToken(data.token);
      saveUsuario(data.usuario);
      localStorage.setItem("user_id", data.usuario.id);
      localStorage.setItem("usuarioTipo", tipo);
      navigate('/');
    } catch (error) {
      setErro(
        error instanceof TypeError
          ? 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
          : 'Não foi possível concluir o login. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ bgcolor: "background.default", position: "relative", overflow: "visible" }}
        className="login-page"
      >
        <Box className="login-header">
          <HeaderLogin />
        </Box>

        <Box component="img" src={StackBooks} alt="StackBooks" className="img-livros" />
        <Box component="img" src={PinkBook} alt="PinkBook" className="img-livros-Dois" />
        <Box component="img" src={OpenOrangeBook} alt="OpenOrangeBook" className="img-livros-Tres" />
        <Box component="img" src={Books} alt="Books" className="img-livros-Quatro" />

        <Box className="center-content">
          <Box className="glass" sx={{ width: "100%", maxWidth: 900, minHeight: 600 }}>

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
                className="login-field"
                label="Email"
                type="email"
                autoComplete="username"
                variant="outlined"
                size="small"
                sx={{ maxWidth: "750px", mx: "auto", mt: 3 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormControl className="login-field" fullWidth size="small" sx={{ mt: 3 }} variant="outlined">
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  required
                  value={senha}
                  autoComplete="current-password"
                  onChange={(e) => setSenha(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Senha"

                />
              </FormControl>

              <Box>
                <Typography
                  variant="body2"
                  component="a"
                  href="/esqueci-senha"
                  className="login-forgot-password"
                  sx={{ ml: 75, color: "#000" }}
                >
                  Esqueceu a senha?
                </Typography>
              </Box>

              <Box>
                <FormControl component="fieldset">
                    <FormLabel component="legend" id="tipo-acesso-label">Tipo de acesso</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="tipo-acesso-label"
                        name="tipoAcesso"
                        value={tipoAcesso}
                        onChange={(e) => setTipoAcesso(e.target.value)}
                      >
                        <FormControlLabel value="Administrador" control={<Radio required />} label="Administrador" />
                        <FormControlLabel value="Funcionário" control={<Radio required />} label="Funcionário" />
                         <FormControlLabel value="Entregador" control={<Radio required />} label="Entregador" />
                        <FormControlLabel value="usuario" control={<Radio required />} label="Usuário" />

                      </RadioGroup>
                </FormControl>
              </Box>


              <Box className="botoes" sx={{mt:3}}> 
                  <Button
                  type="submit"
                  className="btn-cadastrar"
                  sx={{ color:"#ffff", width: "750px" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : "Entrar"}
                </Button>
              </Box>

              <Grid className="linha-login">
                <Typography className="texto-cadastro" sx={{ color: "#242424", mt: 4 }}>
                  Não Tem Cadastro?
                </Typography>
              </Grid>
              <Grid>
                <Box
                  onClick={abrirMenuCriarConta}
                  sx={{
                    cursor: "pointer",
                    color: "#312783",
                    display: "inline-block"
                  }}
                >
                  <Typography variant="body2">
                    Criar Conta
                  </Typography>
                </Box>

                <Menu
                  anchorEl={anchorCriarConta}
                  open={Boolean(anchorCriarConta)}
                  onClose={fecharMenuCriarConta}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/usuarios");
                      fecharMenuCriarConta();
                    }}
                  >
                    Usuário
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      navigate("/entregadores");
                      fecharMenuCriarConta();
                    }}
                  >
                    Entregador
                  </MenuItem>
                </Menu>

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