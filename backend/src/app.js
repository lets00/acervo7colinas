import express from 'express';
import cors from 'cors';

import homeRoutes from './routes/homeRoutes.js';
import livroRoutes from './routes/livroRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/', homeRoutes);

export default app;