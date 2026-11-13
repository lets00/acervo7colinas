import { Router } from 'express';
import { 
    listarQuantidadeEmprestimos,
    criarEmprestimo,
    atualizarEmprestimo
} from '../controllers/emprestimoController.js';

const router = Router();

router.get('/emprestimos', listarQuantidadeEmprestimos);
router.post('/emprestimos', criarEmprestimo);
router.patch('/emprestimos', atualizarEmprestimo);

export default router;