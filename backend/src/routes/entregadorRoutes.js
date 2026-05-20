import { Router } from 'express';
import { criarEntregador, listarEntregadores } from '../controllers/entregadorController.js';

const router = Router();

router.post('/', criarEntregador);
router.get('/', listarEntregadores);

export default router;