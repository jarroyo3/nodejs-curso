const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const { verificaTipoFichero } = require('../middleware/tiposFichero')
const Usuario = require('../models/usuario')
const Producto = require('../models/producto')
const fs = require('fs');
const path = require('path')
app.use(fileUpload());

app.post('/uploads/:tipo/:id', verificaTipoFichero, function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No se han encontrado ficheros para subir.'
        });
    }



    let fichero = req.files.fichero;
    const validExtensions = ['jpg', 'jpeg', 'gif', 'png'];
    let nombreArchivoCortado = fichero.name.split('.');
    let extension = nombreArchivoCortado[1]

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            message: `Extension no válida. Las extensiones permitidas son ${validExtensions.join(',')}`
        });
    }

    // nombre archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    fichero.mv(`uploads/${tipo}/${nombreArchivo}`, function(err) {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        switch (tipo) {
            case 'usuarios':
                imagenUsuario(id, res, nombreArchivo);
                break;
            case 'productos':
                imagenProducto(id, res, nombreArchivo);
                break;
        }
    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            imagenProducto(nombreArchivo, 'productos');
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                message: 'Producto no existe para guardar la foto.'
            })
        }


        borraArchivo(productoDB.img, 'productos');

        productoDB.img = nombreArchivo;
        productoDB.save((err, usuarioGuardado) => {
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        })
    })
}

function imagenProducto() {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            imagenUsuario(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario no existe para guardar la foto.'
            })
        }


        borraArchivo(usuarioDB.img, 'usuarios');

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        })
    })
}

function borraArchivo(archivo, tipo) {
    let property = `ruta_${tipo}`;
    let pathImg = process.env[property] + `/${archivo}`;
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;