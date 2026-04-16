import React, { useState }  from "react";
import Header from "../../components/jsx/Header"; 
import { Table, TableBody, TableCell, tableCellClasses, TableContainer, 
  TableHead, TableRow, Paper, Button, TextField,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput, InputAdornment
} from '@mui/material';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import IconFilterBar from "../../assets/IconFilterBar.jpg";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#cdd3f8',
    fontWeight: 'bold',
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f9f9f9',
  },
}));


const rows = [
  { id: '001', titulo: 'Dom Casmurro', autor: 'Machado de Assis', genero: 'Romance', ano: 1899 },
  { id: '002', titulo: 'Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', genero: 'Fantasia', ano: 1943 },
  { id: '003', titulo: 'Extraordinário', autor: 'R. J. Palacio', genero: 'Romance', ano: 2017 },
  { id: '004', titulo: 'Um Sopro de Vida', autor: 'Clarice Lispector', genero: 'Romance', ano: 1978 },
];


function LivrosSalvos(){
    const [generos, setGeneros] = useState('');
    const [pesquisar, setPesquisar] = useState('');

    const handleChange = (event) => {
    setGeneros(event.target.value);
  };
  const livrosFiltrados = rows.filter((row) => {
  const filtroGenero = generos === '' || row.genero === generos;

  const filtroBusca =
    pesquisar === '' ||
    row.titulo.toLowerCase().includes(pesquisar.toLowerCase()) ||
    row.autor.toLowerCase().includes(pesquisar.toLowerCase());

  return filtroGenero && filtroBusca;
});
    return (
        <>
            <Box className="container">
                <Header/>

                <Box className="content">
                    <Typography variant="h4" align="center" className="titulo" sx={{mt: 4}} >
                        Livros Cadastrados!
                    </Typography>
                    <Box sx={{ml:125, mt:-2, backgroundColor:"#312783", display: 'flex', borderRadius:5}}>
                        <AddCircleIcon sx={{ color: 'white', fontSize: 25, mt:0.5, ml:2 }} />
                        <Typography variant="body2"sx={{ color: 'white', mt:0.5, ml:1}} >
                            Adicionar novo livro
                        </Typography>
                    </Box> 
                    <Box className="faixaSalvos"  sx={{ mt: 4, height: 40,width: '100%', height: '40px', backgroundColor: '#CCD3F8', borderRadius: 1, mb: 3}} > </Box>
                    <Box className="filtrar">
                        <Box component="img"  src={IconFilterBar} alt="IconFilterBar" sx={{height:30, width:30, ml:-150}} />
                        <Typography variant="h6" sx={{color:"#242424", ml:-136, mt:-5}}>
                            Filtrar:
                        </Typography>
                        <FormControl required fullWidth sx={{ width: '300px', ml:-85, mt:-3} } >
                            <InputLabel sx={{ transform: 'translate(14px, 9px) scale(1)' }}>Gênero</InputLabel>
                            <Select
                                value={generos}
                                onChange={handleChange}
                                input={<OutlinedInput label="Gênero" />}
                                displayEmpty
                                size="small"
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
                    <Box>
                        <Typography variant="h6" sx={{color:"#242424", ml:60, mt:-6.5}}>
                            Buscar:
                        </Typography>
                        <TextField
                            size="small"
                            className="header-input"
                            label="Procure seu livro"
                            sx={{ml:108, mt:-3, width:300}}
                            value={pesquisar}
                            onChange={(e) => setPesquisar(e.target.value)}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <SearchIcon />
                                </InputAdornment>
                            ),
                            }}
                        />
                    </Box>
                    <Box sx={{  width:1200, mt: 8}}>
                        <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Título</StyledTableCell>
                                <StyledTableCell>Autor</StyledTableCell>
                                <StyledTableCell>Gênero</StyledTableCell>
                                <StyledTableCell>Ano</StyledTableCell>
                                <StyledTableCell align="center">Ações</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {livrosFiltrados.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.titulo}</TableCell>
                                    <TableCell>{row.autor}</TableCell>
                                    <TableCell>{row.genero}</TableCell>
                                    <TableCell>{row.ano}</TableCell>

                                    <TableCell align="center">
                                    <Button variant="contained" size="small"  sx={{ mr: 1, backgroundColor:"#312783"}} >
                                        Editar
                                    </Button>

                                    <Button variant="contained" color="error" size="small" >
                                        Excluir
                                    </Button>
                                    </TableCell>
                                </StyledTableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ml:-120, mt:1}} >
                            <Typography variant="body2" sx={{ color: '#808080' }}>
                                Exibindo 1-4 de 200 livros(s)
                            </Typography>
                        </Box>
                        <Box >
                            <Pagination count={10} color="primary" sx={{ml:105, mt: 3}} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default LivrosSalvos;