import { Router } from 'express';
import { 
    listarFavoritos,
    adicionarFavorito,
    removerFavorito
} from '../controllers/favoritoController.js';

const router = Router();

router.get('/favoritos', listarFavoritos);
router.post('/favoritos', adicionarFavorito);
router.delete('/favoritos', removerFavorito);

export default router;