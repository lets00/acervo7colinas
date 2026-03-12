import express from 'express';
import cors from 'cors';

import homeRoutes from './routes/homeRoutes.js';
import livroRoutes from './routes/livroRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/livros', livroRoutes);
app.use('/', homeRoutes);

export default app;