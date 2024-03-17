import { validationResult } from 'express-validator';
import Price from '../models/Price.js'
import Category from '../models/Category.js'

const admin = (req, res)=>{
    res.render('properties/admin', {
        page: 'Mis propiedades',
        topbar: true
    })
}

const crear = async (req, res) =>{
    // consultar precios
    // const prices = Price.findAll()
    // //consultar categorias
    // const categories = Category.findAll()

    // Consultando Precios y Categorias
    const [prices, categories] = await Promise.all([
        Price.findAll(),
        Category.findAll()
    ])
    
    res.render('properties/create',{
        page: 'Crear propiedad',
        topbar: true,
        prices,
        categories,
        csrfToken : req.csrfToken(),
        data: {}
    })
}

const guardar = async (req, res)=>{
    // Resultado de la validación
    let result = validationResult(req)
    if(!result.isEmpty()){
        const [prices, categories] = await Promise.all([
            Price.findAll(),
            Category.findAll()
        ])
        res.render('properties/create', {
            page: 'Crear propiedad',
            topbar: true,
            prices,
            categories,
            errors: result.array(),
            csrfToken : req.csrfToken(),
            data : req.body
        })
    }
}

export {
    admin,
    crear,
    guardar
}