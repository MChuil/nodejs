import express from 'express';
import { formLogin, formRegister, formForgotPassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/inicio', formLogin);
router.get('/registro', formRegister);
router.get('/olvide-clave', formForgotPassword);

export default router;