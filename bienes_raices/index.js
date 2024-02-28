import express from 'express'; //ECMAScriptModules
import usuarioRoutes from './routes/usuarioRoutes.js'

// Crear la app
const app = express();


// Habilitar pug
app.set('view engine', 'pug') //cual es el motor de plantilla a usar
app.set('views', './views') // la ruta donde estarán las vistas

// Crear Routing
app.use('/auth', usuarioRoutes)


// definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, ()=>{
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});