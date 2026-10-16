import { Router } from 'express';
import { 
    listarQuantidadeEmprestimos,
    criarEmprestimo
} from '../controllers/emprestimoController.js';

const router = Router();

router.get('/emprestimos', listarQuantidadeEmprestimos);
router.post('/emprestimos', criarEmprestimo);

export default router;