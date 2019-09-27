const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();
const { verificaTokenImg } = require('../middleware/autenticacion')

app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;
    let pathImg = `./uploads/${tipo}/${img}`

    let picture = process.env[`ruta_${tipo}`];
    let noImagePath = path.resolve(__dirname, `../assets/no-image.jpg`)

    if (fs.existsSync(`${picture}/${img}`)) {
        res.sendFile(`${picture}/${img}`)
    } else {

        res.sendFile(noImagePath)
    }


});




module.exports = app;