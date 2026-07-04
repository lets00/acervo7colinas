import dotenv from 'dotenv';
dotenv.config();
import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`);

    console.log(`\n=== Usuários ===`);
    console.log(`GET    http://localhost:${PORT}/usuarios`);
    console.log(`POST   http://localhost:${PORT}/usuarios`);

    console.log(`\n=== Funcionários ===`);
    console.log(`GET    http://localhost:${PORT}/funcionarios`);
    console.log(`POST   http://localhost:${PORT}/funcionarios`);

    console.log(`\n=== Entregadores ===`);
    console.log(`GET    http://localhost:${PORT}/entregadores`);
    console.log(`POST   http://localhost:${PORT}/entregadores`);

    console.log(`\n=== Livros ===`);
    console.log(`GET    http://localhost:${PORT}/livros`);
    console.log(`GET    http://localhost:${PORT}/livros/:id`);
    console.log(`POST   http://localhost:${PORT}/livros`);
    console.log(`PATCH  http://localhost:${PORT}/livros/:id`);
    console.log(`DELETE http://localhost:${PORT}/livros/:id`);

    console.log(`\n=== Exemplares ===`);
    console.log(`GET    http://localhost:${PORT}/exemplares`);
    console.log(`POST   http://localhost:${PORT}/exemplares`);
    console.log(`PATCH  http://localhost:${PORT}/exemplares/:id`);
    console.log(`DELETE http://localhost:${PORT}/exemplares/:id`);
    console.log(`GET    http://localhost:${PORT}/livros/:id/exemplares`);
});