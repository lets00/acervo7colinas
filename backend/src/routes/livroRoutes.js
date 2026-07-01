// acervo7colinas\backend\src\routes\livroRoutes.js
import { Router } from 'express';
import upload from '../middlewares/upload.js';
import {
    criarLivro,
    atualizarLivro,
    deletarLivro,
    buscarLivroPorId,
    listarExemplares,
    listarAvaliacoes,
    listarRelacionados,
    listarLivros
}from '../controllers/livroController.js';

const router = Router();

router.post('/', upload.single('img'), criarLivro);

router.get('/', listarLivros);
router.patch('/:id', upload.single('img'), atualizarLivro);
router.delete('/:id', deletarLivro);
router.get('/:id', buscarLivroPorId);
router.get('/:id/exemplares', listarExemplares);
router.get('/:id/avaliacoes', listarAvaliacoes);
router.get('/:id/relacionados', listarRelacionados);

export default router;