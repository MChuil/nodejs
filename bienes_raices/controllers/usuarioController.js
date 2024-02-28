const formLogin = (req, res)=>{
    res.render('auth/login', {
        autenticado : false
    });
}


export {
    formLogin
}