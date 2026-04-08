// acervo7colinas\backend\src\routes\livroRoutes.js
import { Router } from 'express';
import {
    criarLivro,
    buscarLivroPorId,
    listarExemplares,
    listarAvaliacoes,
    listarRelacionados
}from '../controllers/livroController.js';

const router = Router();

router.post('/', criarLivro);

router.get('/:id', buscarLivroPorId);
router.get('/:id/exemplares', listarExemplares);
router.get('/:id/avaliacoes', listarAvaliacoes);
router.get('/:id/relacionados', listarRelacionados);

export default router;