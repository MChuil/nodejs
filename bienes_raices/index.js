import express from 'express'; //ECMAScriptModules
import cookieParser from 'cookie-parser';
import csurf from 'tiny-csrf';
import db from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'


// Crear la app
const app = express();

//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync();
    console.info('Conexion exitosa a la base de datos')
} catch (error) {
    console.log(error)
}

//habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }))

//Habilitar Cookie Parser
app.use(cookieParser("cookie-parser-secret"));

// Habilitar el CSRF
app.use(csurf("123456789iamasecret987654321look"));

// Habilitar pug
app.set('view engine', 'pug') //cual es el motor de plantilla a usar
app.set('views', './views') // la ruta donde estarán las vistas

//Carpeta Pública
app.use( express.static('public'))


// Crear Routing
app.use('/auth', usuarioRoutes)
app.use('/', propiedadesRoutes)


// definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});