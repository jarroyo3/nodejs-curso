const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const { verificaToken, verificaAdminRole } = require('../middleware/autenticacion')
const app = express()

app.get('/usuario', verificaToken, (req, res) => {

    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    Usuario.find({ status: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            }
            Usuario.countDocuments({ status: true }, (err, total) => {
                res.status(206).json({
                    usuarios,
                    total
                })

            })
        });
})

app.post('/usuario', [verificaToken, verificaAdminRole], (req, res) => {

    const body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(201).json({
            ok: true,
            persona: usuarioDB
        });
    });
})

app.put('/usuario/:id', verificaToken, (req, res) => {
    const id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'status'
    ]);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(204).send();
    })

})

app.delete('/usuario/:id', verificaToken, (req, res) => {

    const id = req.params.id;

    Usuario.findByIdAndUpdate(id, { $set: { 'status': false } }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                err,
                message: 'Usuario no encontrado'
            })
        }

        res.status(204).send();
    })
})

module.exports = app