/**
 * Async Await
 */

/* let getNombre = async() => {

    return 'Jorge';
};

getNombre().then(nombre => {
    console.log(nombre);
}).catch(e => {
    console.log('Error de async', e);
}); */


let empleados = [{
        id: 1,
        nombre: 'Jorge'
    }, {
        id: 2,
        nombre: 'Elisa'
    },
    { id: 3, nombre: 'Juan' }
]

let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 2000
}]

let getEmpleado = async(id) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if (!empleadoDB) {
        throw new Error(`No existe un empleado con el ID ${id}`);
    }
    return empleadoDB;
}

let getSalario = async(empleado) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id)
    if (!salarioDB) {
        throw new Error(`No se encontró un salario para el empleado ${empleado.nombre}`);
    }

    let response = {
        nombre: empleado.nombre,
        salario: salarioDB.salario
    }

    return response;
}

let getInformacion = async(id) => {
    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);
    return `${salario.nombre} tiene un salario de ${salario.salario}€`

}

getInformacion(1)
    .then(mensaje => console.log(mensaje))
    .catch(err => console.log(err))