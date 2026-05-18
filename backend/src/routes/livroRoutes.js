// acervo7colinas\backend\src\routes\livroRoutes.js
import { Router } from 'express';
import upload from '../middlewares/upload.js';
import {
    criarLivro,
    buscarLivroPorId,
    listarExemplares,
    listarAvaliacoes,
    listarRelacionados,
    listarLivros
}from '../controllers/livroController.js';

const router = Router();

router.post('/', upload.single('img'), criarLivro);

router.get('/', listarLivros);
router.get('/:id', buscarLivroPorId);
router.get('/:id/exemplares', listarExemplares);
router.get('/:id/avaliacoes', listarAvaliacoes);
router.get('/:id/relacionados', listarRelacionados);

export default router;