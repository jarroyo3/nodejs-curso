const argv = require('./config/yargs').argv;
const colors = require('colors/safe');

const { crearArchivo, listarTabla } = require('./multiplicar/multiplicar')

let comando = argv._[0];
let base = argv.base;

switch (comando) {
    case 'listar':
        listarTabla(base, argv.limite)
            .catch((err) => console.log(err))
        break;
    case 'crear':
        crearArchivo(base, argv.limite)
            .then(archivo => console.log(colors.green(`Archivo creado:`), colors.blue(`${archivo}`)))
            .catch((err) => console.log(err))
        break;
    default:
        console.log('Comando no reconocido');
}