import { Router } from "express";
import { login, perfil } from "../controllers/loginController.js";

const router = Router();

router.post('/', login);
router.get('/perfil', perfil);

export default router;
