import { Router } from 'express';
import {
    criarProgresso,
    listarProgresso,
    deletarProgresso
} from '../controllers/progressoController.js';

const router = Router();

router.post('/', criarProgresso);
router.get('/', listarProgresso);
router.delete('/:id', deletarProgresso);

export default router;
