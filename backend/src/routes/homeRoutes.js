import { Router } from 'express';
import {
    listarDestaques,
    listarNovidades,
    listarAgendas
} from '../controllers/homeController.js';

const router = Router();

router.get('/destaques', listarDestaques);
router.get('/novidades', listarNovidades);
router.get('/agendas', listarAgendas);

export default router;   