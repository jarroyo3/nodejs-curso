const axios = require('axios')
const api = 'b6907d289e10d714a6e88b30761fae22';

const getClima = async(lat, long) => {
    const resp = await axios.get(`https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}`)
    return resp.data.main.temp;
}

module.exports = {
    getClima
}