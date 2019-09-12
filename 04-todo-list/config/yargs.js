const listarOpts = {
    descripcion: {
        demand: false,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    }
};

const actualizarOpts = {

    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    },
    completado: {
        demand: true,
        alias: 'c',
        default: true,
        desc: 'Marca como completada la tarea',
        type: 'boolean'
    }
};

const borrarOpts = {

    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    }
};

const argv = require('yargs')
    .command('listar', 'Crear un elemento por hacer', listarOpts)
    .command('actualizar', 'Actualiza el estado completado de una tarea', actualizarOpts)
    .command('borrar', 'Elimina la tarea indicada por parametro', borrarOpts)
    .help()
    .argv

module.exports = {
    argv
}