const fs = require('fs');
const path = require('path')

/**
 * Puerto
 */
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Vencimiento Token
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 dias
 */

process.env.CADUCIDAD_TOKEN = '48h';


/**
 * Seed autenticacion
 */

process.env.SEED = process.env.SEED || 'secret';

/**
 * Google Client ID
 */

process.env.CLIENT_ID = process.env.CLIENT_ID || '544076736750-tt8vv0dqgb4r1mambr55g44ckbb89can.apps.googleusercontent.com'

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URL
}

process.env.URLDB = urlDB;

/**
 * ruta uploads usuarios
 */
process.env.ruta_usuarios = path.resolve(__dirname, `../../uploads/usuarios/`);
/**
 * ruta uploads PRODUCTOS
 */
process.env.ruta_productos = path.resolve(__dirname, `../../uploads/productos/`);