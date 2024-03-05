import express from 'express';
import { formLogin, formRegister, formForgotPassword, register } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/inicio', formLogin);
router.get('/registro', formRegister);
router.post('/registro', register);
router.get('/olvide-clave', formForgotPassword);

export default router;