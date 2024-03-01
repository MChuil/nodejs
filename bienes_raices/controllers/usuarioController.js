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


export {
    formLogin,
    formRegister,
    formForgotPassword
}