import express from 'express'
import { admin, crear } from '../controllers/propiedadesController.js'
const router = express.Router()


router.get('/mis-propiedades', admin)
router.get('/propiedad/crear', crear)

export default router