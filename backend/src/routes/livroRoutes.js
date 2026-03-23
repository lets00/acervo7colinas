// acervo7colinas\backend\src\routes\livroRoutes.js
import { Router } from 'express';
import {
    buscarLivroPorId,
    listarExemplares,
    listarAvaliacoes,
    listarRelacionados
}from '../controllers/livroController.js';

const router = Router();

router.get('/:id', buscarLivroPorId);
router.get('/:id/exemplares', listarExemplares);
router.get('/:id/avaliacoes', listarAvaliacoes);
router.get('/:id/relacionados', listarRelacionados);

export default router;