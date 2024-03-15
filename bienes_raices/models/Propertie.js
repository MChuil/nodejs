import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const Propertie = db.define('Properties', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title : {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category : {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    price : {
        type: DataTypes.STRING,
        allowNull: false
    },
    rooms : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wc : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address : {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lng : {
        type: DataTypes.STRING,
        allowNull: false
    },
    image : {
        type: DataTypes.STRING,
        allowNull: false
    },
    published : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
     //TODO: Crear el campo para relacionar con el usuario
})

export default Propertie