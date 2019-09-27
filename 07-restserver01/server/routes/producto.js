const express = require('express')

const { verificaToken, verificaAdminRole } = require('../middleware/autenticacion')

const app = express();

const Producto = require('../models/producto')


/**
 * Lista todas las productos
 */
app.get('/producto', verificaToken, (req, res, err) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                productos: productoDB
            })
        })
});

/**
 * Lista producto por id
 */
app.get('/producto/:id', verificaToken, (req, res, err) => {
    const id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((id, (err, productoDB) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                producto: productoDB
            })
        }))
});

/**
 * Crear producto
 * @returns nueva producto
 */
app.post('/producto', verificaToken, (req, res, err) => {
    const body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })
    })
});

/**
 * Actualiza descripcion producto
 * @returns producto
 */
app.put('/producto/:id', verificaToken, (req, res, err) => {
    const id = req.params.id;
    const body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.descripcion = body.descripcion;
        productoDB.disponible = body.disponible;
        productoDB.categoria = body.categoria;

        productoDB.save((err, productoSaved) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                producto: productoSaved
            })
        });

    })
});


/**
 * Elimina producto
 * 
 */
app.delete('/producto/:id', [verificaToken, verificaAdminRole], (req, res, err) => {
    // solo elimina producto el administrador
    const id = req.params.id;

    Producto.findByIdAndUpdate(id, { $set: { 'disponible': false } }, (err, productoDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(204).send();
    })
});

module.exports = app;