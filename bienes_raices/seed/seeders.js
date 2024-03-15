import { exit } from 'node:process'
import categories from "./categories.js"
import Category from "../models/Category.js"
import db from "../config/db.js"

const importData = async () =>{
    try {
            //Autenticar
            await db.authenticate();

            //Crear las columnas
            await db.sync();

            //Poblar la tabla
            await Category.bulkCreate(categories)

            console.log("Datos importados de forma exitosa...")
            exit()

    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if(process.argv[2] == "-i"){
    importData()
}