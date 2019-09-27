/**
 * 
 */

const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const app = express()


app.post('/login', (req, res) => {
    console.log('entra');
    const body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuario) {
            res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {
            res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign({
            usuario,
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    })
});


/**
 * Configuraciones Google
 */

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }

}

app.post('/google', async(req, res) => {
    const token = req.body.idtoken;
    //console.log(token);
    let googleUser = await verify(token)
        .catch(error => {
            console.log(error);
            res.status(403).json({
                ok: false,
                error
            });
        })

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) {
            if (usuarioDB.google === false) {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Debe usar autenticacion normal'
                        }
                    });
                }
            } else {
                const tokenDB = jwt.sign({
                    usuario: usuarioDB

                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            }
        } else {
            // usuairo no existe en bbdd
            let usuarioNuevo = new Usuario();
            usuarioNuevo.nombre = googleUser.nombre;
            usuarioNuevo.email = googleUser.email;
            usuarioNuevo.google = true;
            usuarioNuevo.img = googleUser.img;
            usuarioNuevo.password = 'd-asdas-d';

            usuarioNuevo.save((err, usuarioDB) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err: {
                            message: 'Debe usar autenticacion normal'
                        }
                    });
                }

                const tokenDB = jwt.sign({
                    usuario: usuarioDB

                }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                });
            });
        }
    })
});

module.exports = app