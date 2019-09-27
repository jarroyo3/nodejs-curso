let verificaTipoFichero = (req, res, next) => {

    const tiposPermitidos = [
        'usuarios',
        'productos'
    ]

    let tipo = req.params.tipo;

    if (tiposPermitidos.indexOf(tipo) < 0) {
        return res.status(401).json({
            ok: false,
            message: 'El tipo de la imagen a subir no es correcto.'
        })
    }
    next();

};


module.exports = { verificaTipoFichero };