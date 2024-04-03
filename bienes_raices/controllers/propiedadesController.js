import { validationResult } from 'express-validator';
import {Price, Category, Propertie} from '../models/index.js'

const admin = async (req, res)=>{

    const { id } = req.user

    const properties = await Propertie.findAll({
        where :{
            userId : id
        },
        include: [
            { model: Category},
            { model: Price}
        ]
    })

    res.render('properties/admin', {
        page: 'Mis propiedades',
        properties
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
            prices,
            categories,
            errors: result.array(),
            csrfToken : req.csrfToken(),
            data : req.body
        })
    }


    //crear registro
    const {title, description, rooms, parking, wc, address, lat, lng, price:priceId, category:categoryId } = req.body

    const { id:userId } = req.user

    try {
        const propiedad = await Propertie.create({
            title,
            description,
            rooms,
            parking,
            wc,
            address,
            lat,
            lng,
            priceId,
            categoryId,
            userId,
            image : ''
        })

        const { id } = propiedad

        res.redirect(`/propiedades/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error)
    }
    console.log(req.body)
}

const agregarImagen = async(req, res) => {
    const {id } = req.params

    // Validar que la propiedad exista
    const property = await Propertie.findByPk(id)
    if(!property){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad NO este publicada
    if(property.published){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad le pertenezca al usuario
    console.log(req.user)
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    res.render('properties/agregar-imagen', {
        page: 'Agregar imagen | ' + property.title,
        csrfToken : req.csrfToken(),
        property,
    })

}


const saveImage = async(req, res, next) =>{
    const {id } = req.params
    try {
        const property = await Propertie.findByPk(id)
        console.log(req.file)
        //Almacenar la imagen y publicar la propiedad
        property.image = req.file.filename
        property.published = 1
        await property.save()
        next()
    } catch (error) {
        console.log(error)
    }
}



const editar = async(req, res)=>{

    const { id } = req.params
    console.log(id)
    //validar que la propiedad exista
    const property = await Propertie.findByPk(id)
    if(!property){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad sea del usuario
    if(property.userId.toString() !== req.user.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    // Consultando Precios y Categorias
    const [prices, categories] = await Promise.all([
        Price.findAll(),
        Category.findAll()
    ])

    res.render('properties/edit',{
        page: 'Editar propiedad',
        prices,
        categories,
        csrfToken : req.csrfToken(),
        data: property,
    })
}


export {
    admin,
    crear,
    guardar,
    agregarImagen,
    saveImage,
    editar
}