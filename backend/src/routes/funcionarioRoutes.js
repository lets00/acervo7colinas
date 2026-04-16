import express from 'express';
import { criarFuncionario, listarFuncionarios } from '../controllers/funcionarioController.js';

const router = express.Router();

router.post('/', criarFuncionario);

router.get('/', listarFuncionarios);

export default router;