require('./config/config')

const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// habilitar carpeta public

app.use(express.static(path.resolve(__dirname, '../public')))

app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (req, res, err) => {
    if (err) throw err;
    console.log('conexion a mongodb exitosa');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${process.env.PORT}`);
})