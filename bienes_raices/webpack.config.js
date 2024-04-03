import path from 'path'

export default {
    mode: 'development',
    entry:{
        mapa : './src/js/mapa.js',
        addImagen: './src/js/addImagen.js'
    },
    output:{
        filename : '[name].js',
        path: path.resolve('public/js')
    }
}