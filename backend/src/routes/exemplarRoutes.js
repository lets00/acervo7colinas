import { Router } from 'express';

import {
    listarExemplares,
    criarExemplar,
    atualizarExemplar,
    deletarExemplar
} from '../controllers/exemplarController.js';

const router = Router();

router.post('/', criarExemplar);
router.get('/', listarExemplares);
router.patch('/:id', atualizarExemplar);
router.delete('/:id', deletarExemplar);

export default router;