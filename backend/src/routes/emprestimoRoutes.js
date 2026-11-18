import { Router } from 'express';
import { 
    listarQuantidadeEmprestimos,
    listarEmprestimos,
    criarEmprestimo,
    atualizarEmprestimo,
    aprovarRetirada
} from '../controllers/emprestimoController.js';
import { autenticarFuncionario } from '../middlewares/autenticarFuncionario.js';

const router = Router();

router.get('/emprestimos', listarQuantidadeEmprestimos);
router.get('/emprestimos/lista', listarEmprestimos);
router.post('/emprestimos', criarEmprestimo);
router.patch('/emprestimos', atualizarEmprestimo);
router.patch(
    '/emprestimos/:id/aprovar-retirada',
    autenticarFuncionario,
    aprovarRetirada
);

export default router;
