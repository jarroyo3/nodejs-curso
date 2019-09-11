const fs = require('fs');
const colors = require('colors');

let crearArchivo = (base, limite) => {
    return new Promise((resolve, reject) => {
        if (!Number(base)) {
            reject(`La base ${base} no es un número!`)
            return;
        }

        if (!Number(limite)) {
            reject(`El límite ${limite} no es un número!`)
            return;
        }

        let filename = `tablas/tabla_${base}_al_${limite}.txt`;
        let data = '';

        for (let i = 1; i <= limite; i++) {
            data += `${base}x${i}=${base * i}\n`;
        }

        fs.writeFile(filename, data, (err) => {
            if (err) reject(err);

            resolve(`${filename}`);
        });
    })
};

let listarTabla = async(base, limite) => {
    if (!Number(base)) {
        throw new Error(`La base no es un número`);
    }

    if (!Number(limite)) {
        throw new Error(`El límite no es un número`);
    }
    console.log('================');
    console.log(`=== TABA DEL ${base} ===`);
    console.log('================');
    for (let i = 1; i <= limite; i++) {
        console.log(`${base}x${i}=${base * i}\n`.blue);
    }

};

module.exports = {
    crearArchivo,
    listarTabla
}