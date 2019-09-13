const lugar = require('./lugar/lugar')
const clima = require('./clima/clima')

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


const getInfo = async(direccion) => {

    try {
        const cityData = await lugar.getLugarLatLong(direccion)
        const climaData = await clima.getClima(cityData.lat, cityData.lon);
        return `El clima de ${direccion} es de ${climaData} (kelvin)`;

    } catch (error) {
        return `No se pudo determinar el clima de ${direccion}`;

    }


}

getInfo(argv.direccion).then(console.log)