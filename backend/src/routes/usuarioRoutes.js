import { Router } from 'express';
import { criarUsuario, listarUsuarios } from '../controllers/usuarioController.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.post(
    '/',
    upload.fields([
        { name: 'fotoPerfil', maxCount: 1 },
        { name: 'fotoRg', maxCount: 1 },
        { name: 'comprovanteResidencial', maxCount: 1 }
    ]),
    criarUsuario
);

router.get('/', listarUsuarios);

export default router;