import React, { useState, useEffect } from "react"; 
import { Box, Button, Typography, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LivroCadastro from "../../assets/livroCadastro.jpeg"; 
import '../../pages/css/CadastroLivros.css';

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

function CampoCadastrosLivros({ onChange, error, helperText }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    
    if (onChange) onChange(file);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Box className="container-cadastro" sx={{ width: '100%', p: 2 }}>
      <Box className="barra">
        <Typography className="barra-texto" variant="h6" sx={{ml: 54}}>
          Cadastro Dos Livros:
        </Typography>
      </Box>

      <Box 
        className="card"
        sx={{
          mt: 2,
          p: 3,
          width: '100%',
          maxWidth: 600, 
          mx: 'auto',    
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontFamily: 'Roboto, sans-serif', color: '#555',  fontWeight: 700}}
        >
          Selecionar Foto do Livro <span style={{ color: 'red' }}>*</span>
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4
        }}>

          <Box
            component="img"
            src={preview || LivroCadastro}
            alt="Imagem do livro"
            sx={{
              width: 180,
              height: 180,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
              border: '2px solid #f0f0f0'
            }}
          />

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#242424",
              backgroundColor: "#ccd3f8",
              textTransform: 'none',
              '&:hover': { backgroundColor: '#b5bff2' } 
            }}
          >
            SELECIONAR FOTO
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
        </Box>
        {error && (
          <Typography color="error" variant="caption" sx={{ mt: 1, fontWeight: 'bold' }}>
            {helperText || "A foto do livro é obrigatória."}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default CampoCadastrosLivros;