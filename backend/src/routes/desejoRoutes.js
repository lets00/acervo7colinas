import { Router } from 'express';
import {
    criarDesejo,
    listarDesejos,
    deletarDesejo
} from '../controllers/desejoController.js';

const router = Router();

router.post('/queroler', criarDesejo);
router.get('/queroler', listarDesejos);
router.delete('/queroler', deletarDesejo);

export default router;