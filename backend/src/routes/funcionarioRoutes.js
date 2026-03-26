import express from 'express';
import { criarFuncionario } from '../controllers/funcionarioController.js';

const router = express.Router();

router.post('/', criarFuncionario);

export default router;