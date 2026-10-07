import { Router } from 'express';
import { criarUsuario, listarUsuarios, listarGeneros, listarLivrosPorMes } from '../controllers/usuarioController.js';
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
router.get('/generos', listarGeneros);
router.get('/livros-por-mes', listarLivrosPorMes);

export default router;