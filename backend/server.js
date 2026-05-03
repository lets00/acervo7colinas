import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log(`Rota usuários http://localhost:${PORT}/usuarios`);
    console.log(`Rota funcionários: http://localhost:${PORT}/funcionarios`);
    console.log(`Rota livros: http://localhost:${PORT}/livros`);
});