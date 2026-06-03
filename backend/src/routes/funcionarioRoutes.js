import express from 'express';
import upload from '../middlewares/upload.js';
import { criarFuncionario, listarFuncionarios } from '../controllers/funcionarioController.js';

const router = express.Router();

router.post(
    '/', 
    upload.single('fotoPerfil'), 
    criarFuncionario
);

router.get('/', listarFuncionarios);

export default router;