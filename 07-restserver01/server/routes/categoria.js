const express = require('express')

const { verificaToken, verificaAdminRole } = require('../middleware/autenticacion')

const app = express();

const Categoria = require('../models/categoria')


/**
 * Lista todas las categorias
 */
app.get('/categoria', (req, res, err) => {

    Categoria.find({})
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoriaDB) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                categorias: categoriaDB
            })
        })
});

/**
 * Lista categoria por id
 */
app.get('/categoria/:id', (req, res, err) => {
    const id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

/**
 * Crear categoria
 * @returns nueva categoria
 */
app.post('/categoria', verificaToken, (req, res, err) => {
    const body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

/**
 * Actualiza descripcion categoria
 * @returns categoria
 */
app.put('/categoria/:id', verificaToken, (req, res, err) => {
    const id = req.params.id;
    const body = req.body;

    Categoria.findByIdAndUpdate(id, { $set: { 'descripcion': body.descripcion } }, { new: true }, (err, categoriaDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok: true,
            categoria: categoriaDB
        })
    })
});


/**
 * Elimina categoria
 * 
 */
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], (req, res, err) => {
    // solo elimina categoria el administrador
    const id = req.params.id;

    Categoria.findByIdAndUpdate(id, { $set: { 'status': false } }, (err, categoriaDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(204).send();
    })
});

module.exports = app;