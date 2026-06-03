import { Router } from 'express';
import upload from '../middlewares/upload.js';
import { criarEntregador, listarEntregadores } from '../controllers/entregadorController.js';

const router = Router();

router.post(
    '/',
    upload.fields([
        { name: 'fotoPerfil', maxCount: 1},
        { name: 'fotoCnh', maxCount: 1}
    ]),
    criarEntregador
);

router.get('/', listarEntregadores);

export default router;