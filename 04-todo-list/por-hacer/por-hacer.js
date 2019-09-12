const fs = require('fs');
const filename = 'db/data.json'
let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(filename, data, (err) => {
        if (err) throw new Error('No se pudo grabar la tarea', err);

        console.log('Tarea guardada correctamente');
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json')

    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const getListado = () => {
    cargarDB();
    return listadoPorHacer.filter(tarea => tarea.completado == false);
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex((tarea) => tarea.descripcion === descripcion)
    if (index > -1) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();
    listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    guardarDB();
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}