const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer')
const colors = require('colors/safe')
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        try {
            let listado = porHacer.getListado();
            if (!listado || listado.length == 0) {
                console.log(colors.red('No se encontraron tareas por hacer'));
                break;
            }
            console.log(colors.green('============ POR HACER ==========\n'));
            for (let tarea of listado) {
                console.log(tarea.descripcion);
                console.log('Estado: ', tarea.completado);
                console.log('\n');
            }
            console.log(colors.green('=================================\n'));

        } catch (error) {
            console.log(colors.red('No se encontraron tareas'));
        }
        break;
    case 'actualizar':
        if (porHacer.actualizar(argv.descripcion, argv.completado)) {
            console.log(`Tarea actualizada con éxito`, argv.descripcion);
        } else {
            console.log('No se pudo actualizar la tarea');
        }
        break;
    case 'borrar':
        porHacer.borrar(argv.descripcion)
        break;
    default:
        console.log('Introduce un comando válido');
        break;
}