import React from "react";
import { Box,Checkbox, Typography, TextField ,InputAdornment, FormControl, InputLabel, OutlinedInput,IconButton, FormControlLabel, Button, Grid} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../css/Login.css";
import Header from "../../components/jsx/HeaderLogin";
import StackBooks from '../../assets/StackBooks.png';    
import PinkBook from '../../assets/PinkBook.png';
import Books from '../../assets/Books.png';
import OpenOrangeBook from '../../assets/OpenOrangeBook.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

const theme = createTheme({
  palette: {
    primary: {
      main: '#CCD3F8',
    },
    background: {
      default: '#CCD3F8',
    },
  },
});

function Login() {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && senha) {
      console.log("Login processado com sucesso!");
    } else {
      console.log("Erro: Preencha todos os campos.");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box  
          sx={{
           bgcolor: 'background.default',position: 'relative',overflow:'visible'}} className="container"  >
          <Box className="header" sx={{ml:-60}}>
            <Header />
          </Box>
          <Box component="img"  src={StackBooks} alt="StackBooks" className="img-livros" />
          <Box component="img"  src={PinkBook} alt="PinkBook" className="img-livros-Dois" />
          <Box component="img"  src={OpenOrangeBook} alt="OpenOrangeBook" className="img-livros-Tres" />
          <Box component="img"  src={Books} alt="Books" className="img-livros-Quatro" />

          <Box className="center-content">
            <Box className="glass" sx={{width:850, minHeight: 400, mt:-90}}>
              <Typography variant="h4" align="center" className="titulo" sx={{mt: 5}}>
                Bem Vindo!
              </Typography>
              <form onSubmit={handleLogin} >
                <TextField required fullWidth label="Email" autoComplete="username" variant="outlined" size="small" sx={{ maxWidth: '750px', mx: 'auto', mt: 8 }}  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormControl sx={{ mt:4 , width: '750px'}} variant="outlined">
                  <InputLabel>Senha</InputLabel>
                  <OutlinedInput
                      type={showPassword ? 'text' : 'password'}
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
                      label="Senha" sx={{height:"45px"}}
                  />
              </FormControl>
    
              <Box>
                  <Typography 
                  variant="body2" 
                  component="a" 
                  href="/esqueci-senha" sx={{ml:75,  color: '#000'}}
                >
                  Esqueceu a senha?
                </Typography>
              </Box>
              <Box className="botoes" sx={{mt:3}}> 
                <Button  className="btn-cadastrar" sx={{color:"#ffff", width: "750px"}} >
                     Entrar
                </Button>
            </Box> 
                <Grid className="linha-login">  
                    <Typography className="texto-cadastro" sx={{color:"#242424", mt:4}} > 
                        Já Tem Cadastro? 
                    </Typography> 
                </Grid> 
                <Grid> 
                    <Typography  className="texto-login" sx={{color:"#312783", mt:1}} >
                        Crie conta
                    </Typography> 
                </Grid> 
                <Box className="icones"> 
                <Button variant="outlined" className="btn-iconUM" sx={{mt:2, border:"none", boxShadow: "none", backgroundColor:"transparent"}}>
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="30" alt="Google" /> 
                    </Button> 
                    <Button variant="outlined" className="btn-iconDOIS" sx={{mt:2, border:"none", boxShadow: "none", backgroundColor:"transparent"}}>
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

export default Login;