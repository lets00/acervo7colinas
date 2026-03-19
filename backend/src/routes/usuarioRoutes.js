import { Router } from 'express';
import { criarUsuario } from '../controllers/usuarioController.js';

const router = Router();

router.post('/', criarUsuario);

export default router;