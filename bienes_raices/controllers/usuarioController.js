import { check, validationResult } from 'express-validator';
import User from "../models/User.js";

const formLogin = (req, res)=>{
    res.render('auth/login', {
        page: 'Inicio de sesión'
    });
}

const formRegister = (req, res) =>{
    res.render('auth/register', {
        page : 'Crear Cuenta'
    })
}

const formForgotPassword = (req, res) =>{
    res.render('auth/forgot-password', {
        page : 'Recuperar acceso a Bienes Raices'
    })
}

const register = async (req, res) =>{
    //validar
    await check('name').notEmpty().withMessage('El Nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Esto no parece un correo electronico').run(req)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe ser de minimo 6 caracteres').run(req)
    await check('repeat_password').equals('password').withMessage('Las contraseñas no son iguales').run(req)
    let result = validationResult(req)


    //verificar que que no haya errores
    if(!result.isEmpty()){
        //errores
        return res.render('auth/register',{
            page: 'Crear Cuenta',
            errors: result.array()
        })
    }

    const user = await User.create(req.body)
    res.json(user)
}


export {
    formLogin,
    formRegister,
    formForgotPassword,
    register
}