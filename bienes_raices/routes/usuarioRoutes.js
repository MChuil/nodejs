import express from 'express';
import { formLogin, auth, formRegister, formForgotPassword, register, comprobar, resetPassword, comprobarToken, newPassword, logout} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/inicio', formLogin);
router.post('/inicio', auth);
router.post('/cerrar-sesion', logout)
router.get('/registro', formRegister);
router.post('/registro', register);
router.get('/olvide-clave', formForgotPassword);
router.get('/confirmar/:token', comprobar)
router.post('/recuperar/acceso', resetPassword)

router.get('/olvide-clave/:token', comprobarToken); //carga la vista
router.post('/olvide-clave', newPassword); // almacena la nueva contraseña


export default router;