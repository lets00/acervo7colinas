import { Router } from 'express';
import { 
    listarQuantidadeEmprestimos,
    listarEmprestimos,
    criarEmprestimo
} from '../controllers/emprestimoController.js';

const router = Router();

router.get('/emprestimos', listarQuantidadeEmprestimos);
router.get('/emprestimos/lista', listarEmprestimos);
router.post('/emprestimos', criarEmprestimo);

export default router;
