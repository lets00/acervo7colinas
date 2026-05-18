import express from 'express';
import cors from 'cors';

import homeRoutes from './routes/homeRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import funcionarioRoutes from './routes/funcionarioRoutes.js';
import entregadorRoutes from './routes/entregadorRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/livros', livroRoutes);
app.use('/', homeRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/funcionarios', funcionarioRoutes);
app.use('/entregadores', entregadorRoutes);
app.use('/login', loginRoutes);

export default app;