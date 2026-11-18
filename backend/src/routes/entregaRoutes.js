import { Router } from 'express';
import { aceitarConvite } from '../controllers/entregaController.js';

const router = Router();

router.post('/convites/:token/aceitar', aceitarConvite);

export default router;